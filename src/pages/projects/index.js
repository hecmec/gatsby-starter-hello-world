import React from "react";
import Layout from "../../components/Layout";
import * as styles from "../../styles/projects.module.css";
import { Link, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const Projects = ({ data }) => {
  console.log("projects:", data);
  const projects = data.projects.nodes;
  const contact = data.contact.siteMetadata.contact;

  return (
    <Layout>
      <div className={styles.portfolio}>
        <h2>Portfolio</h2>
        <h3>Projects & Websites I've Created</h3>
        <div className={styles.projects}>
          {projects.map((project) => {
            console.log("Project data:", project);
            console.log("Thumb data:", project.frontmatter.thumb);

            // Safely get the image data
            let imageComponent = null;

            try {
              if (project.frontmatter.thumb?.childImageSharp?.gatsbyImageData) {
                const imageData = getImage(project.frontmatter.thumb.childImageSharp.gatsbyImageData);
                if (imageData) {
                  imageComponent = <GatsbyImage image={imageData} alt={project.frontmatter.title || "Project thumbnail"} />;
                }
              }
            } catch (error) {
              console.error("Error processing image for project:", project.frontmatter.title, error);
            }

            // Fallback if no image
            if (!imageComponent) {
              imageComponent = (
                <div
                  style={{
                    width: 300,
                    height: 200,
                    backgroundColor: "#f0f0f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#666",
                    fontSize: "14px",
                  }}
                >
                  {project.frontmatter.title || "Project"}
                </div>
              );
            }

            return (
              <Link to={"/projects/" + project.frontmatter.slug} key={project.id}>
                <div>
                  {imageComponent}
                  <h3>{project.frontmatter.title}</h3>
                  <p>{project.frontmatter.stack}</p>
                </div>
              </Link>
            );
          })}
        </div>
        <p>
          Like what you see? <a href={"mailto:" + contact}>Contact me</a>.
        </p>
      </div>
    </Layout>
  );
};

export default Projects;

export const query = graphql`
  query ProjectsPage {
    projects: allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        frontmatter {
          title
          stack
          slug
          thumb {
            childImageSharp {
              gatsbyImageData(width: 300, height: 200, placeholder: BLURRED)
            }
          }
        }
        id
      }
    }
    contact: site {
      siteMetadata {
        contact
      }
    }
  }
`;
