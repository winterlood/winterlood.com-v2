"use client";

import Icon from "@/components/Icon";
import style from "./back-button.module.scss";
import classNames from "classnames/bind";
import { PageCategory } from "types";
import { useRouter } from "next/navigation";
const cx = classNames.bind(style);

export default function BackButton({
  category,
}: {
  category: PageCategory;
}) {
  const router = useRouter();

  return (
    <div className={cx("container")} onClick={() => router.back()}>
      <Icon type="BACK" />
      <div>전체 {category === "post" ? "포스트" : "QNA"}</div>
    </div>
  );
}
