import React from 'react';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

interface Props {
  children: any;
}

function TabContainer(props: Props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  });

function SimpleTabs(props: { classes: any }) {
  const { classes } = props;
  const [value, setValue] = React.useState(0);

  function handleChange(event: any, newValue: any) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <Tabs value={value} variant="fullWidth" onChange={handleChange} centered>
        <Tab label="Restaurantes (10)" />
        <Tab label="Produtos (11)" />
      </Tabs>
      {value === 0 && <TabContainer>Item One</TabContainer>}
      {value === 1 && <TabContainer>Item Two</TabContainer>}
    </div>
  );
}

export default withStyles(styles)(SimpleTabs);
