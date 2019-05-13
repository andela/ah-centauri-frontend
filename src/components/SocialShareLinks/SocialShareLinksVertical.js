import React from 'react';

const SocialShareLinksVertical = (props) => {
  const { shareLinks } = props;

  return (
    <div>
      <div className="jssocials-share jssocials-share-twitter">
        <a
          target="_blank"
          href={shareLinks.twitter}
          className="jssocials-share-link"
        >
          <i
            className="fa fa-twitter jssocials-share-logo"
          />
        </a>
      </div>
      <div className="jssocials-share jssocials-share-facebook">
        <a
          target="_blank"
          href={shareLinks.facebook}
          className="jssocials-share-link"
        >
          <i
            className="fa fa-facebook jssocials-share-logo"
          />
        </a>
      </div>
      <div className="jssocials-share jssocials-share-googleplus">
        <a
          target="_blank"
          href={shareLinks.email}
          className="jssocials-share-link"
        >
          <i
            className="fa fa-envelope-o jssocials-share-logo"
          />
        </a>
      </div>
    </div>

  );
};


export default SocialShareLinksVertical;
