/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql, Link } from 'gatsby';

import '../../styles/base.css';

import { Column, Row } from '../ui/grid';
import Typography from '../ui/typography';
import Button from '../ui/button';
import Box from '../ui/box';

import Container from './container';
import Header from './header';
import Footer from './footer';
import styles from './layout.module.css';
import me from './yackovlev.png';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteSocialLinksQuery {
      site {
        siteMetadata {
          social {
            icon
            link
          }
          author
          description
        }
      }
      allMarkdownRemark(
        limit: 5
        sort: { order: DESC, fields: frontmatter___date }
      ) {
        nodes {
          frontmatter {
            id
            date
            title
          }
        }
        distinct(field: frontmatter___tags)
      }
    }
  `);

  return (
    <div className={styles.layout}>
      <Container>
        <Header {...data.site.siteMetadata} />
      </Container>
      <div className={styles.content}>
        <Container>
          <Row paddings="l" isWrap>
            <Column xs="12" lg="9">
              <main>{children}</main>
            </Column>
            <Column xs="12" lg="3">
              <Box borderBottom="primary" paddingTop="xs" paddingBottom="m">
                <Typography align="center">
                  <img
                    xs="150"
                    alt={data.site.siteMetadata.author}
                    height="150"
                    src={me}
                  />
                  <Typography
                    isCaps
                    marginBottom="xs"
                    fontSize="s"
                    component="title"
                    level={3}
                  >
                    {data.site.siteMetadata.author}
                  </Typography>
                  <Typography color="secondary" marginBottom="none">
                    Frontend developer
                  </Typography>
                  <Typography color="secondary" marginBottom="xs">
                    Mail.ru Group
                  </Typography>
                  <Typography isTruncate color="secondary" marginBottom="none">
                    <a href="mailto:aleksandryackovlev">
                      aleksandryackovlev@yandex.ru
                    </a>
                  </Typography>
                </Typography>
              </Box>
              <Box paddingTop="m" borderBottom="primary">
                <Typography align="center">
                  <Typography
                    isCaps
                    marginBottom="m"
                    fontSize="s"
                    component="title"
                    level={3}
                  >
                    Recent posts
                  </Typography>
                </Typography>
                {data.allMarkdownRemark.nodes.map(
                  ({ frontmatter: { id, title, date } }) => (
                    <Box key={id} paddingBottom="xs">
                      <Typography marginBottom="none" align="center" isBold>
                        <Link to={`/${id}`}>{title}</Link>
                      </Typography>
                      <Typography align="center" color="secondary">
                        {date}
                      </Typography>
                    </Box>
                  )
                )}
              </Box>
              <Box paddingTop="m" paddingBottom="xl">
                <Typography align="center">
                  <Typography
                    isCaps
                    marginBottom="m"
                    fontSize="s"
                    component="title"
                    level={3}
                  >
                    All tags
                  </Typography>
                </Typography>
                <Row isWrap justify="center">
                  {data.allMarkdownRemark.distinct.map(tag => (
                    <Column xs="auto">
                      <Box paddingBottom="s">
                        <Button type="secondary" key={tag} href={`/tag/${tag}`}>
                          {tag}
                        </Button>
                      </Box>
                    </Column>
                  ))}
                </Row>
              </Box>
            </Column>
          </Row>
        </Container>
      </div>
      <Footer {...data.site.siteMetadata} />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
