import React from "react";
import {
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Easing,
  StatusBar
} from "react-native";
import styled from "styled-components";
import Card from "../components/Card";
import { Icon } from "expo";
import { NotificationIcon } from "../components/Icons";
import Logo from "../components/Logo";
import Course from "../components/Course";
import { courses, cards, logos } from "../components/data";
import Menu from "../components/Menu";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { action: state.action };
};

const mapDispatchToProps = dispatch => {
  return {
    openMenu: () =>
      dispatch({
        type: "OPEN_MENU"
      })
  };
};

class HomeScreen extends React.Component {
  state = {
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1)
  };

  componentDidMount() {
    StatusBar.setBarStyle("dark-content", true);
  }

  componentDidUpdate(prevProps, prevState) {
    this.toggleMenu();
  }

  toggleMenu = () => {
    if (this.props.action == "openMenu") {
      Animated.spring(this.state.scale, {
        toValue: 0.9,
        duration: 300,
        easing: Easing.in()
      }).start();

      Animated.spring(this.state.opacity, {
        toValue: 0.5
      }).start();

      StatusBar.setBarStyle("light-content", true);
    }

    if (this.props.action == "closeMenu") {
      Animated.spring(this.state.scale, {
        toValue: 1,
        duration: 300,
        easing: Easing.in()
      }).start();

      Animated.spring(this.state.opacity, {
        toValue: 1
      }).start();

      StatusBar.setBarStyle("dark-content", true);
    }
  };

  render() {
    return (
      <RootView>
        <Menu />
        <AnimatedContainer
          style={{
            transform: [{ scale: this.state.scale }],
            opacity: this.state.opacity
          }}
        >
          <SafeAreaView>
            <ScrollView>
              <TitleBar>
                <TouchableOpacity
                  onPress={this.props.openMenu}
                  style={{ position: "absolute", top: 0, left: 10 }}
                >
                  <Avatar source={require("../assets/avatar.jpg")} />
                </TouchableOpacity>
                <Title>Welcome back,</Title>
                <Name>Kairi</Name>
                <NotificationIcon
                  style={{ position: "absolute", right: 20, top: 5 }}
                />
              </TitleBar>
              <ScrollView
                style={{
                  flexDirection: "row",
                  padding: 20,
                  paddingLeft: 12,
                  paddingTop: 30
                }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {logos.map((logo, i) => {
                  return <Logo key={i} image={logo.image} text={logo.text} />;
                })}
              </ScrollView>
              <Subtitle>Continue Learning</Subtitle>
              <ScrollView
                horizontal={true}
                style={{ paddingBottom: 30 }}
                showsHorizontalScrollIndicator={false}
              >
                {cards.map((card, i) => {
                  return (
                    <Card
                      key={i}
                      title={card.title}
                      image={card.image}
                      caption={card.caption}
                      logo={card.logo}
                      subtitle={card.subtitle}
                    />
                  );
                })}
              </ScrollView>
              <Subtitle>Popular Courses</Subtitle>
              {courses.map((course, i) => {
                return (
                  <Course
                    key={i}
                    image={course.image}
                    title={course.title}
                    subtitle={course.subtitle}
                    logo={course.logo}
                    author={course.author}
                    avatar={course.avatar}
                    caption={course.caption}
                  />
                );
              })}
            </ScrollView>
          </SafeAreaView>
        </AnimatedContainer>
      </RootView>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

const Avatar = styled.Image`
  width: 44px;
  height: 44px;
  background-color: black;
  border-radius: 22px;
  margin-left: 20px;
  /* position: absolute; */
  top: 0;
  left: 0;
`;

const RootView = styled.View`
  background-color: black;
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
  background-color: #f0f3f5;
  border-radius: 10px;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;
`;

const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;
const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 20px;
  text-transform: uppercase;
`;

const TitleBar = styled.View`
  width: 100%;
  margin-top: 50px;
  padding-left: 80px;
`;
