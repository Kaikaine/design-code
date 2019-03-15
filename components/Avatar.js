import React, { Component } from "react";
import styled from "styled-components";

export default class Avatar extends Component {
  state = {
    photo: "https://cl.ly/55da82beb939/download/avatar-default.jpg"
  };

  componentDidMount() {
    fetch("https://uinames.com/api/?ext")
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.setState({
          photo: response.photo
        });
      });
  }

  render() {
    return <Image source={{ uri: this.state.photo }} />;
  }
}

const Image = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  margin-left: 20px;
`;
