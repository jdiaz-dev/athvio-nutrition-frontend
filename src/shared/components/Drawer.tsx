import React from 'react';
import { makeStyles } from 'tss-react/mui';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { TreeItemProps } from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
import MailIcon from '@mui/icons-material/Mail';
import Label from '@mui/icons-material/Label';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { Link, Outlet } from 'react-router-dom';
import Header from './Header';

declare module 'csstype' {
  interface Properties {
    '--tree-view-color'?: string;
    '--tree-view-bg-color'?: string;
  }
}

type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string;
  color?: string;
  labelIcon: React.ElementType<SvgIconProps>;
  labelInfo?: string;
  labelText: string;
};

const useTreeItemStyles = makeStyles()((theme) => {
  return {
    root: {
      'color': theme.palette.text.secondary,
      '&:hover > $content': {
        backgroundColor: theme.palette.action.hover,
      },
      '&:focus > $content, &$selected > $content': {
        backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
        color: 'var(--tree-view-color)',
      },
      '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
        backgroundColor: 'transparent',
      },
    },
    content: {
      color: theme.palette.text.secondary,
      borderTopRightRadius: theme.spacing(2),
      borderBottomRightRadius: theme.spacing(2),
      paddingRight: theme.spacing(1),
      /* fontWeight: theme.typography.fontWeightMedium,
        '$expanded > &': {
          fontWeight: theme.typography.fontWeightRegular,
        }, */
    },
    group: {
      'marginLeft': 0,
      '& $content': {
        paddingLeft: theme.spacing(2),
      },
    },
    expanded: {},
    selected: {},
    label: {
      fontWeight: 'inherit',
      color: 'inherit',
    },
    labelRoot: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0.5, 0),
    },
    labelIcon: {
      marginRight: theme.spacing(1),
    },
    labelText: {
      fontWeight: 'inherit',
      flexGrow: 1,
      textAlign: 'left',
      textDecoration: 'none',
    },
    link: {
      display: 'block',
      textDecoration: 'none',
      color: 'white',
    },
  };
});

function StyledTreeItem(props: StyledTreeItemProps) {
  const { classes } = useTreeItemStyles();
  const { labelText, labelIcon: LabelIcon, labelInfo, ...other } = props;

  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          <LabelIcon color="inherit" className={classes.labelIcon} />
          <Typography variant="body2" className={classes.labelText}>
            <Link className={classes.link} to={labelText}>
              {labelText}
            </Link>
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </div>
      }
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
}

const useStyles = makeStyles()(() => {
  return {
    divSidebar: {
      backgroundColor: '#282d35',
      color: 'white',
    },
    treeView: {
      flexGrow: 1,
      maxWidth: 400,
    },
  };
});

export function Drawer() {
  const { classes } = useStyles();

  return (
    <>
      <div className="main-container">
        <div className={`sidebar ${classes.divSidebar}`}>
          <div>Apocalipsex</div>
          <TreeView
            className={classes.treeView}
            defaultExpanded={['3']}
            defaultCollapseIcon={<ArrowDropDownIcon />}
            defaultExpandIcon={<ArrowRightIcon />}
            defaultEndIcon={<div style={{ width: 24 }} />}
          >
            <StyledTreeItem nodeId="1" labelText="Mandamientos" labelIcon={MailIcon} />
            {/* <StyledTreeItem nodeId="2" labelText="Abridores" labelIcon={DeleteIcon} /> */}

            {/* tickets */}
            <StyledTreeItem nodeId="3" labelText="Tickets" labelIcon={Label} />
            <StyledTreeItem nodeId="3" labelText="Reflecciones" labelIcon={Label} />
          </TreeView>
        </div>
        <div className="app-container">
          <Header></Header>
          <div className="containerOutler" style={{ height: '91vh' }}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
