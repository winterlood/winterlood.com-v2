"use client";

import createSupabaseClient from "app/util/supabase";
import { useEffect, useState } from "react";

async function fetchViews(hashedPath: string): Promise<number> {
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
    if (views && typeof window !== null) {
      increaseViewCount(hashedPath, views);
    }
  }, [views]);

  if (!views) return <></>;
  return <>{views} 조회</>;
}
