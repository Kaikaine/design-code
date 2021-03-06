import React from "react";
import styled from "styled-components";
import { Animated, TouchableOpacity, Dimensions } from "react-native";
import { Icon } from "expo";
import { items } from "./data";
import MenuItem from "./MenuItem";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { action: state.action, name: state.name };
};

const mapDispatchToProps = dispatch => {
  return {
    closeMenu: () =>
      dispatch({
        type: "CLOSE_MENU"
      })
  };
};

const screenHeight = Dimensions.get("window").height;

class Menu extends React.Component {
  state = {
    top: new Animated.Value(screenHeight)
  };

  componentDidMount() {
    this.toggleMenu();
  }

  componentDidUpdate(prevProps, prevState) {
    this.toggleMenu();
  }

  toggleMenu = () => {
    if (this.props.action == "openMenu") {
      Animated.spring(this.state.top, {
        toValue: 54
      }).start();
    }

    if (this.props.action == "closeMenu") {
      Animated.spring(this.state.top, {
        toValue: screenHeight
      }).start();
    }
  };

  render() {
    return (
      <AnimatedContainer style={{ top: this.state.top }}>
        <Cover>
          <Image source={require("../assets/background2.jpg")} />
          <Title>{this.props.name}</Title>
          <Subtitle>Designer at Design+Code</Subtitle>
        </Cover>
        <TouchableOpacity
          onPress={this.props.closeMenu}
          style={{
            position: "absolute",
            top: 120,
            left: "50%",
            marginLeft: -22,
            zIndex: 2
          }}
        >
          <CloseView>
            <Icon.Ionicons name="ios-close" size={44} color="#546bfb" />
          </CloseView>
        </TouchableOpacity>
        <Content>
          {items.map((item, i) => {
            return (
              <MenuItem
                key={i}
                icon={item.icon}
                title={item.title}
                text={item.text}
              />
            );
          })}
        </Content>
      </AnimatedContainer>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);

const Image = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Title = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: 600;
`;

const Subtitle = styled.Text`
  font-size: 13;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 8px;
`;

const CloseView = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: white;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`;

const Container = styled.View`
  position: absolute;
  background: white;
  width: 100%;
  height: 100%;
  z-index: 100;
  border-radius: 10px;
  overflow: hidden;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Cover = styled.View`
  height: 142px;
  align-items: center;
  justify-content: center;
`;

const Content = styled.View`
  height: ${screenHeight};
  background: #f0f3f5;
  padding: 50px;
`;
