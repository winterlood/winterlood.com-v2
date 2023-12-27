"use client";

import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface Props {
  className: string;
  children: string;
}

export default function Codeblock({ className, children }: Props) {
  const [isCopied, setIsCopied] = useState(false);

  const toggle = async () => {
    if (isCopied) return;

    try {
      await navigator.clipboard.writeText(children);
      setIsCopied(!isCopied);
    } catch (err) {
      alert("복사 기능에 문제가 발생했어요 😢");
      console.error(err);
    }
  };

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  }, [isCopied]);

  if (!className) {
    return <code className="inline_code">{children}</code>;
  } else {
    const splitedClassNames = className.split("-");
    const language = splitedClassNames.at(1) ?? "";
    return (
      <div className="code_block">
        <div className="copy_block" onClick={toggle}>
          <span className={isCopied ? "copied" : ""}>
            {isCopied ? "COPIED!" : "COPY"}
          </span>
        </div>
        <SyntaxHighlighter style={vs2015} language={language}>
          {children}
        </SyntaxHighlighter>
      </div>
    );
  }
}
