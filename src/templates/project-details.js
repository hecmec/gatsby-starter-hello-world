import React from "react";
import Layout from "../components/Layout";
import * as styles from "../styles/project-details.module.css";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

const ProjectDetails = ({ data }) => {
  const { html } = data.markdownRemark;
  const { title, stack, featuredImg } = data.markdownRemark.frontmatter;
  // const bannerImage = getImage(data.file.childImageSharp);

  return (
    <Layout>
      <div className={styles.details}>
        <h2>{title}</h2>
        <h3>{stack}</h3>
        <div className={styles.featured}>
          {/* <Img fluid={featuredImg.childImageSharp.fluid} /> */}
          <GatsbyImage image={featuredImg.childImageSharp.gatsbyImageData} alt="page banner" />
        </div>
        <div className={styles.html} dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Layout>
  );
};

export default ProjectDetails;

export const query = graphql`
  query ProjectDetails($slug: String) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        stack
        title
        featuredImg {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED)
          }
        }
      }
    }
  }
`;
