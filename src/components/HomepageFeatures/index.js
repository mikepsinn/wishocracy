import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'No More Wars!',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        {/*Simple Direct Democracy does not prioritize resource allocation.*/}
        There are an infinite number of good ideas. <br/>
        {/*that could all pass an up-down vote, but the world has limited resources.*/}
        Wishocracy allows its Citizens to prioritize the most important with their share of public spending.
      </>
    ),
  },
  {
    title: 'Wisdom of Crowds',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        The book <a href={"https:\/\/en.wikipedia.org/wiki/The\_Wisdom\_of\_Crowds"}>The Wisdom of Crowds</a> has many
        examples
        proving that the combined knowledge of many people is likely to produce better decisions than even the
        smartest experts.&#x20;
      </>
    ),
  },
  {
    title: 'True Representation',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        One <a href={"https://act.represent.us/sign/problempoll-fba/"}>study</a> showed "The preferences of the average
        American appear to have only a minuscule, near-zero, statistically non-significant impact upon public policy."
      </>
    ),
  },
  {
    title: 'Optimal Allocation of Finite Resources',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
          {/*Simple Direct Democracy does not prioritize resource allocation.*/}
          There are an infinite number of good ideas. <br/>
          {/*that could all pass an up-down vote, but the world has limited resources.*/}
           Wishocracy allows its Citizens to prioritize the most important with their share of public spending.
      </>
    ),
  },
  {
    title: 'Wisdom of Crowds',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
          The book <a href={"https:\/\/en.wikipedia.org/wiki/The\_Wisdom\_of\_Crowds"}>The Wisdom of Crowds</a> has many
               examples
          proving that the combined knowledge of many people is likely to produce better decisions than even the
          smartest experts.&#x20;
      </>
    ),
  },
  {
    title: 'True Representation',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
          One <a href={"https://act.represent.us/sign/problempoll-fba/"}>study</a> showed "The preferences of the average
          American appear to have only a minuscule, near-zero, statistically non-significant impact upon public policy."
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
          <div className="row">
              <h3 className="center">Features</h3>
          </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
