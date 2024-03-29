import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import BackIcon from '@material-ui/icons/ArrowBackIos';
import SearchIcon from '@material-ui/icons/Search';
import qs from 'query-string';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing.unit * 2,
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing.unit * 3,
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing.unit * 9,
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 7,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200,
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  });

export interface Props {
  back?: boolean;
  classes?: any;
  history: any;
  tab?: any;
}

interface State {
  anchorEl: null | HTMLElement;
  mobileMoreAnchorEl: null | HTMLElement;
  input: any;
}

class PrimarySearchAppBar extends React.Component<Props, State> {
  state: State = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    input: '',
  };

  componentDidMount() {
    const { search } = this.props.history.location;
    const query = qs.parse(search);
    if (query) {
      this.setState({ input: query.q });
    }
  }

  handleChange = (e: any) => {
    const { value } = e.target;
    this.setState({ input: value });
    this.props.history.push(`/busca?q=${value}`);
  };

  render() {
    const { classes, back, history, tab } = this.props;
    const { input } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            {back && (
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="voltar"
                onClick={() => history.goBack()}
              >
                <BackIcon />
              </IconButton>
            )}
            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap
            >
              Kardap
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Buscar…"
                onChange={this.handleChange}
                value={input}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
export default withStyles(styles)(PrimarySearchAppBar);
