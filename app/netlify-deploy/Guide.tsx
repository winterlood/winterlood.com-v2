"use client";

import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import style from "./page.module.scss";

const cx = classNames.bind(style);

// 화면이 바뀌어 이 페이지를 고칠 때마다 이 날짜도 함께 바꾼다
const LAST_CHECKED = "2026년 11월 27일";

type Screen = "a" | "b";

function Shot({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className={cx("shot")}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/netlify-deploy/${src}`} alt={alt} loading="lazy" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className={cx("step")}>
      <h3>
        <span className={cx("num")}>{n}</span>
        {title}
      </h3>
      {children}
    </section>
  );
}

function ScreenA() {
  return (
    <>
      <Step n={1} title="프로젝트 폴더 올리기">
        <p>
          대시보드 아래쪽에 <b>Drag and drop your folder here</b>라고 적힌 점선 영역이 있습니다. 배포할 프로젝트
          폴더를 이 영역에 끌어다 놓습니다. 끌어다 놓기가 어렵다면 영역 안의 <b>choose a folder</b>를 클릭해 폴더를
          직접 골라도 됩니다.
        </p>
        <Shot src="a1-drop.png" alt="대시보드 아래쪽의 폴더 끌어다 놓기 영역이 빨간 박스로 강조된 화면" />
        <p>
          처음 가입했다면 아직 프로젝트가 없어서 이 영역이 화면 가운데에 크게 보입니다. 브라우저가 &quot;이 폴더의
          파일을 업로드할까요?&quot;라고 물으면 <b>업로드</b>를 클릭합니다.
        </p>
      </Step>

      <Step n={2} title="Private 표시 확인하고 Make public 클릭하기">
        <p>
          업로드가 끝나면 방금 배포한 프로젝트 화면으로 바뀝니다. 프로젝트 이름 옆에 <b>Private</b> 표시가 있다면,
          아직 <b>나만 볼 수 있는 상태</b>입니다. 이대로 주소를 다른 사람에게 보내면 그 사람에게는 페이지 대신
          Netlify 로그인 화면이 뜹니다.
        </p>
        <div className={cx("note")}>
          여러분이 뭔가를 잘못한 게 아닙니다. Netlify가 새로 가입한 계정은 배포한 사이트를 비공개로 시작하도록
          바꿨기 때문입니다. 아래처럼 공개로 한 번만 바꿔 주면 됩니다.
        </div>
        <p>
          이름 아래에 있는 <b>Make public</b> 버튼을 클릭합니다.
        </p>
        <Shot src="a2-make-public.png" alt="프로젝트 화면에서 Make public 버튼이 빨간 박스로 강조된 모습" />
        <p className={cx("sub")}>
          이름 옆에 Private 대신 <b>Public</b>이 보이고 Make public 버튼도 없다면, 이미 공개된 상태입니다. 2·3단계는
          건너뛰고 아래 <a href="#rename-a">주소 이름만 바꾸기</a>로 가면 됩니다.
        </p>
      </Step>

      <Step n={3} title="주소 이름 정하고 공개하기">
        <p>
          Make public 창이 열립니다. Netlify가 자동으로 지어 준 주소는 <code>grand-duckanoo-6cd0e0</code>처럼
          외우기 어려우니, 공개하는 김에 이름도 같이 바꾸겠습니다. 주소 오른쪽의 <b>연필 아이콘</b>을 클릭합니다.
        </p>
        <Shot src="a3-pencil.png" alt="Make public 창의 Website URL 오른쪽 연필 아이콘이 빨간 박스로 강조된 모습" />
        <p>
          원하는 이름을 영어 소문자, 숫자, 하이픈(-)으로 입력합니다. 아래에 <b>Project name is available</b>이 뜨면
          쓸 수 있는 이름입니다. 오른쪽의 <b>체크 버튼</b>을 클릭해 이름을 확정합니다.
        </p>
        <Shot src="a4-confirm.png" alt="새 이름을 입력하자 Project name is available이 뜨고, 체크 버튼이 빨간 박스로 강조된 모습" />
        <p className={cx("sub")}>
          이름은 전 세계에서 하나뿐이어야 합니다. 이미 누가 쓰는 이름이라면 뒤에 숫자를 붙이는 식으로 살짝 바꿔
          보세요.
        </p>
        <p>
          그 아래 공개 범위가 <b>Public (Anyone on the internet)</b>, 즉 &quot;누구나&quot;로 되어 있는지 확인합니다. 그대로
          두고 아래쪽의 <b>Make public</b> 버튼을 클릭합니다.
        </p>
        <Shot src="a5-make-public.png" alt="공개 범위가 Public으로 되어 있고, 창 아래쪽 Make public 버튼이 빨간 박스로 강조된 모습" />
        <p>
          <b>Your project is public</b>이라는 창이 뜨고, 그 아래에 새 주소가 보이면 공개가 끝난 것입니다.
        </p>
        <Shot src="a6-done.png" alt="Your project is public 창과 새 주소 onebite-timer-guide.netlify.app" />
      </Step>

      <Step n={4} title="다른 사람 입장에서 열어 보기">
        <p>
          내 브라우저는 Netlify에 로그인돼 있어서, 비공개여도 페이지가 그냥 보일 수 있습니다. 그래서 확인은 꼭{" "}
          <b>다른 사람 입장</b>에서 합니다. 크롬의 시크릿 창(<code>Ctrl+Shift+N</code>, 맥은{" "}
          <code>⌘+Shift+N</code>)이나 스마트폰 브라우저에서 새 주소를 열어 보세요.
        </p>
        <p>
          로그인 화면 없이 <b>내 페이지가 바로 보이면 성공</b>입니다.
        </p>
      </Step>

      <section className={cx("extra")} id="rename-a">
        <h3>이미 공개된 상태에서 주소 이름만 바꾸기</h3>
        <p>
          프로젝트 화면의 <b>Project configuration</b>을 클릭하면 Project details 화면이 나옵니다. 아래쪽의{" "}
          <b>Change project name</b> 버튼을 클릭하고 새 이름을 입력해 저장합니다.
        </p>
        <Shot src="a7-change-name.png" alt="Project configuration의 Project details 화면에서 Change project name 버튼이 빨간 박스로 강조된 모습" />
      </section>
    </>
  );
}

function ScreenB() {
  return (
    <>
      <div className={cx("note")}>
        이 화면은 Netlify가 2026년 11월부터 일부 계정에 먼저 적용하고 있는 새 화면입니다. 아직 모든 단계를 직접
        캡처하지 못해서, 일부는 <b>Netlify 공식 문서의 그림</b>으로 안내합니다. 직접 확인되는 대로 실제 화면으로
        바꿔 두겠습니다.
      </div>

      <Step n={1} title="프로젝트 폴더 올리기">
        <p>
          첫 화면에 있는 폴더 끌어다 놓기 영역(Drop)에 프로젝트 폴더를 끌어다 놓습니다. 업로드가 끝나면 Netlify가
          주소를 하나 만들어 줍니다.
        </p>
      </Step>

      <Step n={2} title="Private 표시 확인하기">
        <p>
          새 화면에서는 프로젝트를 <b>앱(App)</b>이라고 부릅니다. 앱 목록이나 앱 화면의 주소 옆에{" "}
          <b>Private</b> 표시가 있다면 아직 나만 볼 수 있는 상태입니다. 이대로 주소를 보내면 다른 사람에게는
          로그인 화면이 뜹니다.
        </p>
        <Shot src="b1-private.png" alt="Apps 목록의 앱 이름 아래 Private 표시가 빨간 박스로 강조된 모습" caption="그림 출처: Netlify 공식 문서" />
        <p className={cx("sub")}>
          여러분이 잘못한 게 아니라, Netlify가 새로 가입한 계정은 비공개로 시작하도록 바꿨기 때문입니다.
        </p>
      </Step>

      <Step n={3} title="Manage 열기">
        <p>
          앱 목록에서 앱 오른쪽의 <b>⋯</b> 버튼을 클릭하고 <b>Manage</b>를 고릅니다. 앱 화면 안에 있다면 오른쪽
          위의 <b>Manage</b> 버튼을 클릭해도 같습니다.
        </p>
        <Shot
          src="b1-manage.png"
          alt="앱 오른쪽 ⋯ 메뉴에서 Manage 항목이 빨간 박스로 강조된 모습"
          caption="그림 출처: Netlify 공식 문서"
        />
      </Step>

      <Step n={4} title="Who can see it에서 공개로 바꾸기">
        <p>
          Manage 창 오른쪽 위의 <b>Find a setting</b> 검색칸에 <code>Who can see it</code>을 입력해 그 항목을
          엽니다. Manage 창 안의 <b>Your app → Who can see it</b>으로 찾아 들어가도 됩니다.
        </p>
        <Shot
          src="b2-find-setting.png"
          alt="Manage 창 오른쪽 위의 Find a setting 검색칸이 빨간 박스로 강조된 모습"
          caption="그림 출처: Netlify 공식 문서"
        />
        <p>
          여기서 <b>Require Netlify team login</b>(Netlify 로그인 요구)이나 <b>비밀번호</b>가 켜져 있다면 끄고,
          누구나 볼 수 있는 <b>Public</b> 상태로 바꾼 다음 저장합니다.
        </p>
        <div className={cx("note")}>
          오른쪽 위의 <b>Publish</b> 버튼은 수정한 새 버전을 올리는 버튼입니다. 공개 범위와는 관계가 없으니,
          공개로 바꿀 때는 Manage 쪽을 이용합니다.
        </div>
      </Step>

      <Step n={5} title="주소 이름 바꾸기">
        <p>
          같은 Manage 창의 <b>Your app → Name and address</b>에서 주소 이름을 바꿀 수 있습니다. 이름은 전
          세계에서 하나뿐이어야 하니, 이미 쓰이는 이름이면 뒤에 숫자를 붙여 보세요.
        </p>
      </Step>

      <Step n={6} title="다른 사람 입장에서 열어 보기">
        <p>
          크롬 시크릿 창이나 스마트폰 브라우저에서 주소를 열어, 로그인 화면 없이 <b>내 페이지가 바로 보이면
          성공</b>입니다.
        </p>
      </Step>
    </>
  );
}

export default function Guide() {
  const [screen, setScreen] = useState<Screen>("a");

  useEffect(() => {
    if (window.location.hash === "#new") setScreen("b");
  }, []);

  const choose = (s: Screen) => {
    setScreen(s);
    history.replaceState(null, "", s === "b" ? "#new" : window.location.pathname);
  };

  return (
    <article className={cx("guide")}>
      <header className={cx("head")}>
        <h1>Netlify로 내 웹 페이지 배포하기</h1>
        <p className={cx("lead")}>
          내 컴퓨터에만 있던 프로젝트 폴더를 Netlify에 올려, 누구나 열 수 있는 인터넷 주소로 만드는 과정입니다.
          한입 시리즈 책과 강의에서 이 주소로 넘어왔다면, 여기 안내를 따라 하면 됩니다.
        </p>
        <p className={cx("checked")}>
          마지막 확인: {LAST_CHECKED} · Netlify 화면은 자주 바뀌어서, 바뀔 때마다 이 페이지를 고칩니다.
        </p>
      </header>

      <section className={cx("prep")}>
        <h2>시작하기 전에</h2>
        <p>
          <a href="https://www.netlify.com" target="_blank" rel="noreferrer">
            netlify.com
          </a>
          에서 <b>Sign up</b>을 클릭해 가입합니다. 구글 계정으로 가입하면 가장 간단합니다. 가입 중에 나오는 설문은
          아무 값이나 골라도 배포 결과에 영향이 없습니다. 첫 프로젝트를 배포하라는 화면이 나오면{" "}
          <b>Skip this step for now</b>를 클릭해 넘어갑니다.
        </p>
      </section>

      <section>
        <h2>내 화면은 어느 쪽인가요?</h2>
        <p>
          지금 Netlify는 계정마다 다른 화면을 보여 주고 있습니다. 로그인했을 때 보이는 화면과 비슷한 쪽을 고르세요.
        </p>
        <div className={cx("pick")}>
          <button className={cx("card", { on: screen === "a" })} onClick={() => choose("a")}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/netlify-deploy/a0-dashboard.png" alt="왼쪽에 Projects 메뉴가 있는 Netlify 화면" />
            <strong>왼쪽에 Projects 메뉴가 있어요</strong>
            <span>대부분 이 화면입니다</span>
          </button>
          <button className={cx("card", { on: screen === "b" })} onClick={() => choose("b")}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={cx("right")} src="/netlify-deploy/b0-new-topbar.png" alt="위쪽에 Manage, Activity, Publish 버튼이 있는 새 Netlify 화면" />
            <strong>위쪽에 Manage · Publish 버튼이 있어요</strong>
            <span>새 화면 (그림 출처: Netlify 공식 문서)</span>
          </button>
        </div>
      </section>

      <section className={cx("steps")}>
        <h2>{screen === "a" ? "Projects 화면에서 배포하기" : "새 화면에서 배포하기"}</h2>
        {screen === "a" ? <ScreenA /> : <ScreenB />}
      </section>

      <section className={cx("stuck")}>
        <h2>그래도 화면이 다르거나 막혔다면</h2>
        <p>
          지금 보이는 화면을 캡처해서 AI에게 그대로 보여 주고 물어보세요. 화면이 바뀌어도 가장 빨리 길을 찾는
          방법입니다.
        </p>
        <pre className={cx("prompt")}>
          Netlify에 사이트를 배포했는데, 다른 사람이 주소를 열면 로그인 화면이 떠. 누구나 볼 수 있게 공개로 바꾸고
          싶어. 첨부한 지금 화면에서 무엇을 눌러야 하는지 순서대로 알려 줘
        </pre>
        <p className={cx("sub")}>
          인프런 강의 수강생이라면 Q&amp;A 게시판에 화면 캡처와 함께 질문을 올려 주세요. 확인해서 답변드리고, 이
          페이지도 고쳐 두겠습니다.
        </p>
      </section>
    </article>
  );
}
