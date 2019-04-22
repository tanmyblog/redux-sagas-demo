import React, { Component } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import { black500, white500 } from 'material-ui/styles/colors';
import LightbulbOutlineIcon from 'material-ui/svg-icons/action/lightbulb-outline';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import { List } from 'immutable';
import Input from './components/Input';
import ShowType from './components/ShowType';
import ToDoItem from './components/TodoItem';
import { lightTheme, darkTheme, SHOW_TYPE_ALL } from './common/Constants';
import { addItem as _addItem, changeItemType, deleteItem } from './actions/todo';
import { changeThemeAction, changeShowType, changeText } from './actions/other';
import PropTypes from 'prop-types';
import './App.css';

const mapStateToProps =
  ({ themeName, showType, text, items }) => ({ themeName, showType, text, items });

const mapDispatchToProps = dispatch => ({
  addItem: text => dispatch(_addItem(text)),
  onShowTypeChange: type => dispatch(changeShowType(type)),
  onThemeChange: () => dispatch(changeThemeAction()),
  onItemClick: (index, isSelected) => dispatch(changeItemType(index, isSelected)),
  onDelete: index => dispatch(deleteItem(index)),
  onTextChange: text => dispatch(changeText(text)),
});

class App extends Component {

  render() {
    const { text, addItem, onShowTypeChange, items, onTextChange, showType,
      onItemClick, onDelete, themeName, onThemeChange } = this.props;
    const inputProps = { text, addItem, onTextChange };
    const showTypeProps = { onShowTypeChange, showType };
    const toDoItemProps = { items, showType, onItemClick, onDelete };
		console.log("TCL: App -> render -> items", items)
  
    const isDarkTheme = () => themeName === darkTheme;

    return (
      <div>
        <MuiThemeProvider
          muiTheme={getMuiTheme(isDarkTheme() ? darkBaseTheme : lightBaseTheme)}
        >
          <div>
            <AppBar
              title="ToDo App"
              iconElementLeft={
                <IconButton
                  onClick={() => onThemeChange()}
                >
                  <LightbulbOutlineIcon
                    color={isDarkTheme() ? black500 : white500}
                  />
                </IconButton>}
            />
            <Paper
              style={{
                width: '100%',
                minHeight: 100,
                display: 'inline-block',
                padding: 20,
              }}
              zDepth={5}
            >
              <div style={{ display: 'inline-block', textAlign: 'center' }}>
                <Input {...inputProps} />
              </div>
              <div style={{ display: 'inline' }}>
                <ShowType {...showTypeProps} />
              </div>
              <div style={{ display: 'inline-block' }}>
                <ToDoItem {...toDoItemProps} />
              </div>
            </Paper>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

App.propTypes = {
  themeName: PropTypes.string,
  showType: PropTypes.string,
  text: PropTypes.string,
  items: PropTypes.object,
  addItem: PropTypes.func,
  onShowTypeChange: PropTypes.func,
  onThemeChange: PropTypes.func,
  onItemClick: PropTypes.func,
  onDelete: PropTypes.func,
  onTextChange: PropTypes.func
};

App.defaultProps = {
  themeName: lightTheme,
  showType: SHOW_TYPE_ALL,
  text: '',
  items: List(),
  addItem: () => { },
  onShowTypeChange: () => { },
  onThemeChange: () => { },
  onItemClick: () => { },
  onDelete: () => { },
  onTextChange: () => { }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
