import React from 'react';
import Footer from '@theme-original/Footer';
import {MendableFloatingButton} from "@mendable/search";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function FooterWrapper(props) {
    const {
        siteConfig: { customFields },
    } = useDocusaurusContext()
  return (
    <>
        <MendableFloatingButton anon_key={customFields.mendableAnonKey} />
      <Footer {...props} />
    </>
  );
}
