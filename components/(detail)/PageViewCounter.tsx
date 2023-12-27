"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function PageViewCounter() {
  const pathname = usePathname();
  const [view, setView] = useState<number | undefined>();

  const fetchPageViewCount = async () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/pageview${
      pathname ? `?path=${pathname}` : ""
    }`;
    const res = await fetch(url);

    if (res.ok) {
      const data: { path: string; pageView: string }[] = await res.json();
      setView(data[0] ? parseInt(data[0].pageView) : 0);
    } else {
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
