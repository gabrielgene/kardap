import React from "react";

import { createStyles, Theme, withStyles } from "@material-ui/core/styles";

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import tileData from './tileData/tiles';

interface Props {
  classes: any;
}

const styles = (theme: any) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper
    },
    tile: {
        borderRadius: 40,
        maxWidth: 180,
        maxHeight: 180,
        margin: 2
    },
    gridList: {
      flexWrap: "nowrap",
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: "translateZ(0)"
    },
    title: {
      color: '#ffffff',
      fontSize: 16
    },
    titleBar: {
      background:
        "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
    }
  });

const CategoriesList = (props: Props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {tileData.map(tile => (
          <GridListTile classes={{ tile: classes.tile }} className={classes.tile} key={tile.img} >
            <img  src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              classes={{
                root: classes.titleBar,
                title: classes.title
              }}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default withStyles(styles)(CategoriesList);
