"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  pageCategory: string;
  pageNotionId: string;
  pageSlug: string;
}

const GA_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function PageViewCounter({ pageCategory, pageNotionId, pageSlug }: Props) {
  const pathname = usePathname();
  const [view, setView] = useState<number | undefined>();

  const fetchPageViewCount = async () => {
    try {
      const pageViewResponses = await Promise.all(
        [pageNotionId, pageSlug].map((path) =>
          fetch(
            `${GA_URL}/api/pageview${`?path=/${pageCategory}/${encodeURI(path)}`}`
          ).then((res) => res.json())
        )
      );

      const pageView = pageViewResponses.reduce((acc, res) => {
        if (res[0]) {
          const { pageView } = res[0];
          return acc + (parseInt(pageView) || 0);
        } else {
          return acc;
        }
      }, 0);

      setView(pageView);
    } catch (err) {
      setView(0);
    }
  };

  useEffect(() => {
    if (pathname) {
      fetchPageViewCount();
    }
  }, [pathname]);

  if (view === undefined) {
    return <></>;
  } else {
    return <>{view} 조회</>;
  }
}
