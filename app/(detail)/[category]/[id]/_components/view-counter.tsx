"use client";

import createSupabaseClient from "app/util/supabase";
import { unstable_noStore } from "next/cache";
import { useEffect, useState } from "react";

async function fetchViews(hashedPath: string): Promise<number> {
  unstable_noStore();
  const supabase = createSupabaseClient();
  const { data } = await supabase
    .from("blog-pageview")
    .select("views")
    .eq("path-hash", hashedPath);
  let views = 0;
  if (data && data.length >= 1) {
    views = data[0].views;
  }
  return views;
}

async function increaseViewCount(
  hashedPath: string,
  prevViews: number
) {
  unstable_noStore();
  const supabase = createSupabaseClient();
  await supabase.from("blog-pageview").upsert({
    "path-hash": hashedPath,
    views: prevViews + 1,
  });
}

export default function ViewCounter({
  hashedPath,
}: {
  hashedPath: string;
}) {
  const [views, setViews] = useState<number | null>(null);

  const init = async () => {
    const views = await fetchViews(hashedPath);
    setViews(views);
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (views !== null && typeof window !== null) {
      increaseViewCount(hashedPath, views);
    }
  }, [views]);

  if (!views) return <></>;
  return <>{views} 조회</>;
}
