import { type NextPage } from "next";
import Image from "next/image";
import { forwardRef, useMemo, type ReactNode } from "react";

import useGrouped, { type GroupedItems, type Options } from "@/hooks/grouped";

import { formatDateTime } from "@/utils/datetime";
import { classes } from "@/utils/classes";
import { convertToSlug } from "@/utils/slugs";

import Section from "@/components/content/Section";
import Heading from "@/components/content/Heading";
import VideoPlayer from "@/components/content/Video";
import Meta from "@/components/content/Meta";
import Link from "@/components/content/Link";
import Grouped, { type GroupedProps } from "@/components/content/Grouped";

import valentines2024Video from "@/assets/events/valentines-2024.mp4";
import fallCarnival2023Video from "@/assets/events/fall-carnival-2023.mp4";
import summerCamp2023Video from "@/assets/events/summer-camp-2023.mp4";
import artAuction2023Video from "@/assets/events/art-auction-2023.mp4";
import valentines2023Video from "@/assets/events/valentines-2023.mp4";
import artAuction2022Video from "@/assets/events/art-auction-2022.mp4";
import halloween2021Video from "@/assets/events/halloween-2021.mp4";
import fundathon2021Video from "@/assets/events/fundathon-2021.mp4";

import leafRightImage1 from "@/assets/floral/leaf-right-1.png";
import leafRightImage2 from "@/assets/floral/leaf-right-2.png";
import leafLeftImage1 from "@/assets/floral/leaf-left-1.png";
import leafLeftImage2 from "@/assets/floral/leaf-left-2.png";

type Event = {
  name: string;
  date: Date;
  video: Video;
  stats: Record<string, { title: string; stat: string }>;
  info: ReactNode;
};

const events: Event[] = [
  {
    name: "Valentine's Day 2024",
    date: new Date("2024-02-14"),
    video: valentines2024Video,
    stats: {
      totalDonations: {
        title: "Raised for Alveus Sanctuary",
        stat: "$32,697",
      },
      signedPostcards: {
        title: "Signed postcards sent to donors",
        stat: "467",
      },
      plushies: {
        title: "Hand-crafted plushies distributed",
        stat: "18",
      },
      revealed: {
        title: "New ambassador revealed",
        stat: "1",
      },
    },
    info: (
      <>
        <p>
          Celebrating Valentine&apos;s Day once again, live viewers joined us
          for a short fundraising stream. They were able to donate $25 or more
          to get a signed postcard with artwork featuring the ambassadors to
          commemorate the event, and an entry into the raffle. During the event,
          we were able to raise $32,697 for the sanctuary, with 467 postcards
          sent out to donors. The top 3 donors during the event were able to
          pick the plushie they would like, and the remaining 15 plushies, all
          handcrafted by Maya, were distributed to random raffle winners from
          those who donated $25 or more.
        </p>
        <p>
          We also revealed a new ambassador during the event, introducing
          everyone to <Link href="/ambassadors/push-pop">Push Pop</Link>, our
          Sulcata Tortoise. Live viewers also got to meet many of our other
          ambassadors as we headed around the property to distribute
          Valentine&apos;s-themed enrichment (crafted items to help encourage
          natural behaviors like foraging) to them. Thanks to everyone who tuned
          in and supported this event!
        </p>
      </>
    ),
  },
  {
    name: "Fall Carnival 2023",
    date: new Date("2023-11-04"),
    video: fallCarnival2023Video,
    stats: {
      totalDonations: {
        title: "Raised for Alveus Sanctuary",
        stat: "$16,057",
      },
      signedTickets: {
        title: "Signed tickets sent to donors",
        stat: "330",
      },
      ambassadorPolaroids: {
        title: "Ambassador polaroids distributed",
        stat: "36",
      },
      uniqueDonors: {
        title: "Unique donors during the broadcast",
        stat: "200",
      },
    },
    info: (
      <>
        <p>
          A fun-filled event at Alveus Sanctuary, where live viewers on the
          stream could compete against each other and ambassadors at Alveus to
          earn virtual points. To help raise funds for Alveus, any donation over
          $25 would get a signed ticket sent to them, and any donation over $250
          would get a signed polaroid of one of the ambassadors.
        </p>
        <p>
          Live viewers could earn points in a variety of events, including a rat
          maze with riddles to solve in each room as the ambassadors explored
          the maze, ring toss with{" "}
          <Link href="/ambassadors/abbott">Abbott</Link> the crow, and a race
          with the{" "}
          <Link href="/ambassadors/barbara-baked-bean">cockroaches</Link>.
          Throughout the whole event a game of bingo was also being played with
          the live viewers, with ambassadors around the property picking out
          numbers.
        </p>
        <p>
          By the end of the 3-hour-long event, we were able to raise $16,057 for
          Alveus Sanctuary, with 330 signed carnival tickets being sent to the
          donors and 36 ambassador polaroids being sent out to those that went
          the extra mile in their donations. Thank you to everyone that watched
          and supported this spooky event!
        </p>
      </>
    ),
  },
  {
    name: "Summer Camp 2023",
    date: new Date("2023-07-21"),
    video: summerCamp2023Video,
    stats: {
      totalDonations: {
        title: "Raised for Alveus Sanctuary",
        stat: "$14,070",
      },
      uniqueViewers: {
        title: "Unique viewers tuned in",
        stat: "414,000",
      },
      craftsAuctioned: {
        title: "Summer crafts auctioned off",
        stat: "16",
      },
      minutesStreamed: {
        title: "Minutes streamed live",
        stat: "1,495",
      },
    },
    info: (
      <>
        <p>
          A 24-hour-long livestream event, featuring many of the Alveus staff
          camping in the Session Yard at Alveus. There were plenty of activities
          for the staff to participate in, including an archery competition to
          start the event off, a water balloon fight later in the day, cooking
          dinner around a campfire, late-night beer pong and feeding the pasture
          with a catapult.
        </p>
        <p>
          After camping overnight, still on the stream, the event ended with a
          craft auction where viewers could bid and donate on 16 different
          crafts made by the staff for the event, including multiple friendship
          bracelets, two different Summer Camp paintings, a few
          ambassador-themed hats, two handcrafted pet rocks, a rubber chicken
          and the Summer Camp Spirit Stick itself.
        </p>
        <p>
          Over the course of the 24-hour stream, a total of $14,070 was raised
          for Alveus Sanctuary, with $6,291 of that coming from the craft
          auction. Thank you to everyone that watched the stream, and to
          everyone that donated to support the sanctuary!
        </p>
      </>
    ),
  },
  {
    name: "Art Auction 2023",
    date: new Date("2023-04-22"),
    video: artAuction2023Video,
    stats: {
      totalDonations: {
        title: "Raised for Alveus Sanctuary",
        stat: "$63,019",
      },
      signedPrints: {
        title: "Signed postcards for donors",
        stat: "261",
      },
      ambassadorPaintings: {
        title: "Ambassador paintings sold",
        stat: "33",
      },
      averagePrice: {
        title: "Paid for each painting on average",
        stat: "$570",
      },
    },
    info: (
      <>
        <p>
          Hosted in the Session Yard at Alveus, with Connor and Alex from the
          Alveus team as the auctioneers, the Art Auction 2023 was a huge
          success. Livestream viewers were able to bid on paintings created by
          the ambassadors at Alveus via chat, with 33 paintings being sold this
          year. For viewers who were unable to win a painting, they had the
          option to donate $25 or more to get a signed postcard for the event,
          and 261 wonderful donors claimed one.
        </p>
        <p>
          The event raised $63,019 for Alveus Sanctuary over the course of the
          3.5-hour-long event, with $31,500 of that from an incredibly generous
          donation by Rotary at the end of the event.{" "}
          <Link href="/ambassadors/georgie">Georgie</Link> was our most
          successful ambassador artist this year, with his four paintings
          raising $4,225 in donations, with the top one selling for $2.1k. Thank
          you to everyone that watched and supported this event!
        </p>
      </>
    ),
  },
  {
    name: "Valentine's Day 2023",
    date: new Date("2023-02-14"),
    video: valentines2023Video,
    stats: {
      totalDonations: {
        title: "Raised for Alveus Sanctuary",
        stat: "$40,076",
      },
      signedPostcards: {
        title: "Signed postcards sent to donors",
        stat: "596",
      },
      dabloons: {
        title: "Dabloons distributed to donors",
        stat: "1,600",
      },
      viewers: {
        title: "Peak viewers on the stream",
        stat: "9,729",
      },
    },
    info: (
      <>
        <p>
          To celebrate Valentine&apos;s Day, we hosted a short livestream
          fundraiser. Viewers were able to donate $25 or more to get a signed
          postcard for the event, and the chance to win an ambassador plushie
          handcrafted by Maya. We were able to raise $40,076 for Alveus over the
          3-hour-long event, with 596 donors claiming a postcard.
        </p>
        <p>
          Each donation of $25 or more would also include some 3D-printed
          dabloons ($25 per dabloon), which also represented an entry into the
          plushie giveaway (one free entry was available for anyone unable to
          donate). The top 5 donors during the event were able to pick which
          plushie they would like, and the remaining 19 plushies were
          distributed based on random golden dabloons amongst the 1,600 dabloons
          sent out to donors. Thank you to everyone that watched and supported
          this event!
        </p>
      </>
    ),
  },
  {
    name: "Art Auction 2022",
    date: new Date("2022-04-22"),
    video: artAuction2022Video,
    stats: {
      totalDonations: {
        title: "Raised for Alveus Sanctuary",
        stat: "$42,104",
      },
      signedPrints: {
        title: "Signed prints sent to donors",
        stat: "199",
      },
      auctionWinners: {
        title: "Auction winners",
        stat: "23",
      },
      ambassadorPaintings: {
        title: "Ambassador paintings sold",
        stat: "30",
      },
    },
    info: (
      <p>
        30 incredible paintings produced by the ambassadors at Alveus (with help
        from our animal care staff) were up for auction, with livestream viewers
        able to bid in real-time to get one. Alongside the paintings, anyone was
        able to donate $100 or more to claim a signed print of a painting
        containing all the ambassadors. During the event, we raised $42,104 for
        Alveus Sanctuary, with 199 donors claiming a print. Thank you for your
        support!
      </p>
    ),
  },
  {
    name: "Halloween 2021",
    date: new Date("2021-10-31"),
    video: halloween2021Video,
    stats: {
      totalDonations: {
        title: "Raised for Alveus Sanctuary",
        stat: "$101,971",
      },
      uniqueDonors: {
        title: "Unique donors during the broadcast",
        stat: "1,235",
      },
      namesWritten: {
        title: "Names written on the wall by creators",
        stat: "244",
      },
      creators: {
        title: "Creators attended the event",
        stat: "34",
      },
      viewers: {
        title: "Peak viewers on the stream",
        stat: "93,000",
      },
    },
    info: (
      <>
        <p>
          The Halloween event at Alveus was a massive success, with 34 creators
          from across the streaming space descending on the sanctuary to help
          raise money for the animals. During the event, anyone that donated
          $250 or more had their name written on the side wall of the Nutrition
          House, with the wall being sealed after the event. Over the evening, 5
          hours of live content, we were able to raise $101,971 for Alveus
          Sanctuary, with 1,235 donors claiming a name on the wall.
        </p>
        <p>
          Two teams were formed from the creators, and they competed in many
          activities around the property throughout the event. A game of apple
          bobbing started the evening off, followed by hale bale throwing to see
          which team had better technique. A little while later, we had a game
          of badminton on the grass, followed by trivia and then the dunk tank.
          We rounded off the evening with some mud wrestling. Thank you to all
          the creators that joined us, and everyone who watched and donated!
        </p>
      </>
    ),
  },
  {
    name: "Fund-a-thon 2021",
    date: new Date("2021-02-10"),
    video: fundathon2021Video,
    stats: {
      totalDonations: {
        title: "Raised for Alveus Sanctuary",
        stat: "$573,004",
      },
      uniqueDonors: {
        title: "Unique donors during the broadcast",
        stat: "3,904",
      },
      leaves: {
        title: "Engraved leaves on the donator trees",
        stat: "2,455",
      },
      viewers: {
        title: "Peak viewers on the stream",
        stat: "82,000",
      },
    },
    info: (
      <p>
        The event that started it all! A 20-hour-long mega-stream with a bunch
        of donation goals along the way, aiming to raise as much money as
        possible to kick-start Alveus. Each donor that donated $100 or more got
        their name engraved on a golden leaf that form part of six donor trees
        now affixed to the back of the studio building. The final goal for the
        stream was that at $500k raised Maya would shave her head, and we were
        able to reach that goal with $573,004 raised for Alveus over the whole
        stream. Thank you to all the leafers, everyone that donated and everyone
        that watched!
      </p>
    ),
  },
];

const sortByOptions = {
  all: {
    label: "All Events",
    sort: (events) =>
      [...events]
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .reduce<GroupedItems<Event>>((map, event) => {
          const year = event.date.getUTCFullYear().toString();

          map.set(year, {
            name: year,
            items: [...(map.get(year)?.items || []), event],
          });
          return map;
        }, new Map()),
  },
} as const satisfies Options<Event>;

const EventItems = forwardRef<HTMLDivElement, GroupedProps<Event>>(
  ({ items, option, group, name, index }, ref) => {
    const itemsWithSlugs = useMemo(
      () =>
        items.reduce(
          (acc, item) => {
            const slug = convertToSlug(item.name);
            return { ...acc, [slug]: item };
          },
          {} as Record<string, Event>,
        ),
      [items],
    );

    return (
      <>
        {name && (
          <Heading
            level={-1}
            className={classes(
              "alveus-green-800 mb-6 mt-8 border-b-2 border-alveus-green-300/25 pb-2 text-4xl",
              index === 0 && "sr-only",
            )}
            id={`${option}:${group}`}
            link
          >
            {name}
          </Heading>
        )}
        <div ref={ref}>
          {Object.entries(itemsWithSlugs).map(([slug, event], idx, arr) => (
            <div
              key={slug}
              className={classes(
                "flex flex-wrap gap-y-8 pb-12 pt-8",
                idx === 0 ? "lg:pb-16" : "lg:py-16",
                idx !== arr.length - 1 &&
                  "border-b-2 border-alveus-green-300/15",
              )}
            >
              <div className="mx-auto flex basis-full flex-col px-8 lg:basis-1/2">
                <Heading
                  level={2}
                  className="my-4 scroll-mt-8 text-center text-4xl"
                  id={slug}
                  link
                  linkClassName="flex flex-wrap items-end justify-center gap-x-8 gap-y-2"
                >
                  {event.name}
                  <small className="text-xl text-alveus-green-600">
                    {formatDateTime(event.date, { style: "long" })}
                  </small>
                </Heading>

                <div className="my-auto flex flex-wrap py-2">
                  {Object.entries(event.stats).map(([key, stat]) => (
                    <div
                      key={key}
                      className="mx-auto basis-full py-2 text-center sm:basis-1/2 lg:px-2"
                    >
                      <p className="text-3xl font-bold">{stat.stat}</p>
                      <p className="text-xl text-alveus-green-700">
                        {stat.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className={classes(
                  "mx-auto flex basis-full flex-col px-8 lg:basis-1/2",
                  idx % 2 === 0 && "lg:order-first",
                )}
              >
                <VideoPlayer
                  className="my-auto aspect-video w-full rounded-xl"
                  poster={event.video.poster}
                  sources={event.video.sources}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>

              <div className="flex basis-full flex-col gap-3 px-8 text-lg text-gray-600">
                {event.info}
              </div>
            </div>
          ))}
        </div>
      </>
    );
  },
);

EventItems.displayName = "EventItems";

const EventsPage: NextPage = () => {
  const { option, group, result } = useGrouped({
    items: events,
    options: sortByOptions,
    initial: "all",
  });

  return (
    <>
      <Meta
        title="Events"
        description="We host one-off fundraising events to increase awareness of our conservation missions and to encourage donations to support Alveus."
      />

      {/* Nav background */}
      <div className="-mt-40 hidden h-40 bg-alveus-green-900 lg:block" />

      <div className="relative">
        <Image
          src={leafRightImage1}
          alt=""
          className="pointer-events-none absolute -top-8 right-0 z-10 hidden h-auto w-1/2 max-w-sm select-none lg:block"
        />
        <Image
          src={leafLeftImage2}
          alt=""
          className="pointer-events-none absolute -bottom-24 left-0 z-10 hidden h-auto w-1/2 max-w-[12rem] select-none lg:block"
        />

        <Section dark className="py-24">
          <div className="w-full lg:w-3/5">
            <Heading>Our Events</Heading>
            <p className="text-lg">
              We host one-off fundraising events to increase awareness of our
              conservation missions and to encourage donations to support
              Alveus.
            </p>
          </div>
        </Section>
      </div>

      {/* Grow the last section to cover the page */}
      <div className="relative flex flex-grow flex-col">
        <Image
          src={leafLeftImage1}
          alt=""
          className="pointer-events-none absolute -bottom-32 -left-8 z-10 hidden h-auto w-1/2 max-w-[10rem] -rotate-45 select-none lg:block 2xl:max-w-[12rem]"
        />
        <Image
          src={leafRightImage2}
          alt=""
          className="pointer-events-none absolute -bottom-60 right-0 z-10 hidden h-auto w-1/2 max-w-[10rem] select-none lg:block 2xl:-bottom-64 2xl:max-w-[12rem]"
        />

        <Section className="flex-grow">
          <Grouped
            option={option}
            group={group}
            result={result}
            component={EventItems}
          />
        </Section>
      </div>
    </>
  );
};

export default EventsPage;
