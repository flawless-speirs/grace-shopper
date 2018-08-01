import React, { Component } from "react";
import MenuButton from "./MenuButton"
import Menu from "./Menu"

class MenuContainer extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      visible: false
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  handleMouseDown(evt) {
    this.toggleMenu();
    evt.stopPropagation();
  }

  toggleMenu() {
    this.setState(
      {
        visible: !this.state.visible
      }
    );
  }
  render() {
    return (
      <div>
        <MenuButton handleMouseDown={this.handleMouseDown}/>
        <Menu handleMouseDown={this.handleMouseDown}
        isLoggedIn = {this.props.isLoggedIn}
        handleClick={this.props.handleClick}
          menuVisibility={this.state.visible}/>
      </div>
    );
  }
}

export default MenuContainer;
