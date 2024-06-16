import type { Meta, StoryFn } from "@storybook/react";
import React from "react";
import Popup from "./Popup";

export default {
  title: "Components/Popup",
  component: Popup,
} as Meta;

const Template: StoryFn = (args) => <Popup />;

export const Default = Template.bind({});
