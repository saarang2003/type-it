import { TypingResult } from "@/app/types";
import { IconGithub, IconRedirect } from "@/public/assets";
import { useContext } from "react";





interface Props{
    roomCode : string | null;
    opPreviewResult : (result : TypingResult) => void;
}

export default function Footer( props : Props) {
    const { roomCode , onPreviewResult} = props;

    const {typingFocused} = useContext(TypingContext);

    return (
        <footer
        
          className={`${styles.footer} opacity-transition ${
        typingFocused ? 'hide' : ''
      }`}>

        <div>
            <Tooltip
          text={
            <div className={styles['github-hover-wrapper']}>
              <p>repository</p>
              <IconRedirect className={styles['github-hover-wrapper__icon']} />
            </div>
          }
          position="right"
          showOnHover
        >
          <a
            href="https://github.com/LukaKobaidze/typing-app"
            rel="noreferrer"
            target="_blank"
            className={styles.linksItemAnchor}
            tabIndex={typingFocused ? -1 : undefined}
          >
            <IconGithub />
          </a>
        </Tooltip>
        </div>

        </footer>
    )
}