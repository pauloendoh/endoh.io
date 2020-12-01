import {
  Avatar,
  Box,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import Flex from 'components/shared/Flexboxes/Flex';
import React from "react";
import pauloendoh from "../../static/images/pauloendoh.jpg";

// PE 2/3 - DRY - separate social links in a const array and map it
const FooterDescription = (props: Props) => {
  const classes = useStyles();

  return (
    <Flex {...props}>
      <Avatar
        alt="Paulo Endoh"
        src={pauloendoh}
        className={classes.largeAvatar}
      />
      <Box ml={2}>
        <Box fontWeight="bold">Paulo Ricardo Endoh</Box>
        <Box mt={1}>24yo CompSci student from São Paulo, Brazil.</Box>
        <Box>
          <Typography variant="inherit" color="secondary">
            Developer and artist wannabe.
          </Typography>
        </Box>
        <Box mt={2}>
          Built in ReactJS, Node, PostgreSQL, TypeORM, Typescript and MaterialUI.
        </Box>
        <Box>Designed in Figma and hosted in AWS.</Box>

        <Box mt={3}>
          <IconButton
            size="small"
            href="https://twitter.com/pauloendoh_"
            target="_blank"
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            size="small"
            href="https://www.instagram.com/pauloendoh/"
            target="_blank"
          >
            <InstagramIcon />
          </IconButton>
          <IconButton
            size="small"
            href="https://www.linkedin.com/in/pauloendoh/"
            target="_blank"
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton
            size="small"
            href="https://github.com/pauloendoh"
            target="_blank"
          >
            <GitHubIcon />
          </IconButton>
        </Box>
        <Box>pauloendoh@gmail.com</Box>
      </Box>
    </Flex>
  );
};

type Props = React.ComponentProps<typeof Box>;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    largeAvatar: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  })
);

export default FooterDescription;
