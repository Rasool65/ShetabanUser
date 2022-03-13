import { FunctionComponent } from 'react';
import { FooterSocialLinkType, IFooterSocialLinkProp } from './IFooterSocialLinkProp';

export const FooterSocialLink: FunctionComponent<IFooterSocialLinkProp> = (props) => {
  let icon = '';
  switch (props.type) {
    case FooterSocialLinkType.instagram:
      icon = 'instagram';
      break;
    case FooterSocialLinkType.linkedin:
      icon = 'linkedin-in';
      break;
    case FooterSocialLinkType.twitter:
      icon = 'twitter';
      break;
  }

  return (
    <>
      <li className="list-inline-item">
        <a className={FooterSocialLinkType[props.type].toString()} href={props.url}>
          <i className={'fab fa-' + icon}></i>
        </a>
      </li>
    </>
  );
};
