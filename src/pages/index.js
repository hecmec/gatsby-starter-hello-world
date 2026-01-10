import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import * as styles from "../styles/home.module.css";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

export default function Home({ data }) {
  console.log(data);
  const { title, description } = data.site.siteMetadata;
  const bannerImage = data.file.childImageSharp.gatsbyImageData;

  return (
    <Layout>
      <section className={styles.header}>
        <div>
          <h2>Design</h2>
          <h3>Develop & Deploy</h3>
          <p>UX designer & web developer based in Manchester.</p>
          <Link className={styles.btn} to="/projects">
            My Portfolio Projects
          </Link>
        </div>
        {/* <Img fluid={bannerImage} alt="site banner" style={{ maxWidth: "100%" }} /> */}
        <GatsbyImage image={bannerImage} alt="site banner" />
        <p>
          {title} - {description}
        </p>
      </section>
    </Layout>
  );
}

export const query = graphql`
  query Banner {
    file(relativePath: { eq: "banner.png" }) {
      childImageSharp {
        gatsbyImageData(width: 400, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
      }
    }
    site {
      siteMetadata {
        description
        title
      }
    }
  }
`;

// query SiteInfo {
//   site {
//     siteMetadata {
//       description
//       title
//     }
//   }
// }
