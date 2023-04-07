import React, {
  useCallback,
  useEffect,
  useState,
  createContext,
  useContext,
  useMemo,
  forwardRef,
  useRef,
} from "react";
import { Dialog } from "@headlessui/react";

import { safeJSONParse } from "@/utils/helpers";

import Heading from "@/components/content/Heading";
import { ptSans, ptSerif } from "@/components/layout/Layout";
import IconCross from "@/icons/IconCross";

type ConsentData = {
  name: string;
  description: string;
};

const consentData = {
  twitch: {
    name: "Twitch.tv",
    description: "Embedded livestreams from Twitch.tv",
  },
  youtube: {
    name: "YouTube",
    description: "Embedded videos from YouTube.com",
  },
} as const satisfies Record<string, ConsentData>;

type ConsentKeys = keyof typeof consentData;

type Consent = Readonly<{
  [K in ConsentKeys]: boolean;
}>;

const defaultConsent = Object.freeze(
  Object.keys(consentData).reduce(
    (acc, key) => ({ ...acc, [key]: false }),
    {} as Consent
  )
) as Consent;

const isPartialConsent = (val: unknown): val is Partial<Consent> =>
  typeof val === "object" &&
  val !== null &&
  Object.entries(val).every(
    ([k, v]) =>
      Object.prototype.hasOwnProperty.call(consentData, k) &&
      typeof v === "boolean"
  );

type ConsentContext = Readonly<{
  consent: Consent;
  update: (consent: Partial<Consent>) => void;
  reset: () => void;
  loaded: boolean; // If we've checked local storage for consent
  interacted: boolean; // If local storage has a consent value set
}>;

declare global {
  interface Window {
    consent: ConsentContext | undefined;
  }
}

const Context = createContext<ConsentContext | undefined>(undefined);

const ConsentButton: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
}> = forwardRef(({ onClick, children, disabled }, ref) => (
  <button
    type="button"
    className={[
      "basis-full rounded-lg bg-alveus-green p-4 font-bold text-alveus-tan",
      disabled
        ? "bg-alveus-green-300"
        : "bg-alveus-green transition-colors hover:bg-alveus-green-900",
    ].join(" ")}
    onClick={onClick}
    disabled={disabled}
    ref={ref}
  >
    {children}
  </button>
));
ConsentButton.displayName = "ConsentButton";

const ConsentDialog: React.FC<{ context: ConsentContext }> = ({ context }) => {
  const { consent, update, reset, loaded, interacted } = context;

  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  // Track if the user has ever interacted with the consent dialog
  const [hasInteracted, setHasInteracted] = useState<boolean | null>(null);
  useEffect(() => {
    // If we haven't loaded yet, or the dialog is open, don't do anything
    // We don't want to change hasInteracted while open so the reset button doesn't appear randomly
    if (!loaded || open) return;

    // If the user has interacted, track it
    if (interacted) {
      setHasInteracted(true);
      return;
    }

    // If the user hasn't interacted, and this is the first run, show the dialog
    if (hasInteracted === null) {
      setHasInteracted(false);
      setOpen(true);
    }
  }, [loaded, open, interacted, hasInteracted]);

  // Allow all consent values to be updated at once
  const updateAll = useCallback(
    (val: boolean) => {
      update(
        Object.keys(consent).reduce((acc, key) => ({ ...acc, [key]: val }), {})
      );
      close();
    },
    [update, consent, close]
  );

  // Track the allow all button, so we can focus it when the dialog opens
  const allowAllRef = useRef<HTMLButtonElement>(null);

  // Track if the user has consented to anything, we'll use this for the visual toggle
  const hasConsented = useMemo(
    () => Object.values(consent).some(Boolean),
    [consent]
  );

  return (
    <>
      <Dialog
        open={open}
        onClose={close}
        initialFocus={allowAllRef}
        className={`relative z-50 ${ptSans.variable} ${ptSerif.variable}`} // Include fonts as this is portal'd
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="max-h-full w-full max-w-xl overflow-y-auto rounded-2xl bg-alveus-tan p-4 pt-0 shadow-2xl">
            <Dialog.Title
              as={Heading}
              level={2}
              className="flex items-start gap-2"
            >
              <div className="my-2 flex-grow">
                {!hasInteracted && (
                  <small className="block text-lg leading-snug text-alveus-green">
                    Welcome to Alveus
                  </small>
                )}
                Consent Management
              </div>
              <button
                type="button"
                onClick={close}
                className="-mr-2 flex-shrink-0 p-2 transition-colors hover:text-alveus-green"
              >
                <span className="sr-only">Close</span>
                <IconCross />
              </button>
            </Dialog.Title>

            <Dialog.Description>
              We embed some third-party content on our website, and need your
              consent to do so. These third parties may set cookies on your
              device to personalise content and analyze traffic. Please select
              which third-party content you would like to allow on our website:
            </Dialog.Description>

            <div className="my-6 flex flex-col gap-y-2">
              {Object.entries(consentData).map(([key, data]) => (
                <label key={key} className="flex items-center">
                  <div className="flex-grow">
                    <p>{data.name}</p>
                    <p className="text-sm text-alveus-green">
                      {data.description}
                    </p>
                  </div>

                  <div
                    className={[
                      consent[key as ConsentKeys]
                        ? "bg-alveus-green"
                        : "bg-alveus-green-300",
                      "relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full shadow-inner transition-colors",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <span
                      className={[
                        consent[key as ConsentKeys]
                          ? "translate-x-6"
                          : "translate-x-1",
                        "inline-block h-4 w-4 rounded-full bg-alveus-tan shadow transition-transform",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    />
                  </div>

                  <input
                    type="checkbox"
                    checked={consent[key as ConsentKeys]}
                    onChange={(e) => update({ [key]: e.target.checked })}
                    className="hidden"
                  />
                </label>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 sm:flex-nowrap">
              {hasInteracted && (
                <ConsentButton onClick={reset} disabled={!interacted}>
                  Reset consent
                </ConsentButton>
              )}
              <ConsentButton onClick={() => updateAll(false)}>
                Deny all
              </ConsentButton>
              <ConsentButton onClick={() => updateAll(true)} ref={allowAllRef}>
                Allow all
              </ConsentButton>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      <button
        type="button"
        className="group fixed bottom-4 left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-alveus-tan shadow transition-shadow hover:shadow-lg"
        onClick={() => setOpen(true)}
      >
        <span className="sr-only">Manage consent</span>

        <div
          className={[
            open && "bg-alveus-green",
            "relative inline-flex h-4 w-8 items-center rounded-full border-2 border-alveus-green transition-colors group-hover:bg-alveus-green",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <span
            className={[
              hasConsented ? "translate-x-3.5" : "-translate-x-0.5",
              "inline-block h-4 w-4 rounded-full border-2 border-alveus-green bg-alveus-tan transition-transform",
            ]
              .filter(Boolean)
              .join(" ")}
          />
        </div>
      </button>
    </>
  );
};

export const ConsentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const [consent, setConsent] = useState<Consent>(defaultConsent);

  useEffect(() => {
    const raw = localStorage.getItem("consent");
    if (raw) {
      const parsed = safeJSONParse(raw);
      if (isPartialConsent(parsed)) {
        setConsent((prev: Consent) => Object.freeze({ ...prev, ...parsed }));
        setInteracted(true);
        setLoaded(true);
        return;
      }
    }

    setLoaded(true);
  }, []);

  const update = useCallback((consent: Partial<Consent>) => {
    setConsent((prev: Consent) => {
      localStorage.setItem("consent", JSON.stringify({ ...prev, ...consent }));
      return Object.freeze({ ...prev, ...consent });
    });
    setInteracted(true);
  }, []);

  const reset = useCallback(() => {
    setConsent(defaultConsent);
    setInteracted(false);
    localStorage.removeItem("consent");
  }, []);

  const value = useMemo<ConsentContext>(
    () => Object.freeze({ consent, update, reset, loaded, interacted }),
    [consent, update, reset, loaded, interacted]
  );

  useEffect(() => {
    window.consent = value;
    return () => {
      window.consent = undefined;
    };
  }, [value]);

  return (
    <Context.Provider value={value}>
      {children}
      <ConsentDialog context={value} />
    </Context.Provider>
  );
};

export const useConsent = () => {
  const context = useContext(Context);
  if (context === undefined)
    throw new Error("useConsent must be used within a ConsentProvider");
  return context;
};
