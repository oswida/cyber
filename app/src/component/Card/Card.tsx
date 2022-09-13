import { styled } from "~/common";
import { DelButton, Flex, Text } from "~/component";

const CardRoot = styled("div", {
  padding: 10,
  position: "relative",
  display: "flex",
  flexDirection: "column",
  minWidth: 190,
  maxWidth: 350,

  borderRadius: "20px 0px",
  outlineOffset: 2,
  marginTop: 3,
  variants: {
    color: {
      yellow: {
        outline: "solid 1px $yellow",
        borderBottom: "solid 1px $yellow",
        borderRight: "solid 1px $yellow",
      },
      pink: {
        outline: "solid 1px $pink",
        borderBottom: "solid 1px $pink",
        borderRight: "solid 1px $pink",
      },
      blue: {
        outline: "solid 1px $blue",
        borderBottom: "solid 1px $blue",
        borderRight: "solid 1px $blue",
      },
      green: {
        outline: "solid 1px $green",
        borderBottom: "solid 1px $green",
        borderRight: "solid 1px $green",
      },
    },
  },
  defaultVariants: {
    color: "yellow",
  },
});

const CardTitle = styled(Text, {
  display: "flex",
  alignItems: "center",
  justifyContent: "end",
  width: "100%",
  maxWidth: 350,
  flexWrap: "wrap",
  textTransform: "uppercase",
  marginLeft: 20,
  paddingBottom: 5,
  paddingLeft: 10,
  marginBottom: 10,
  variants: {
    color: {
      blue: {
        color: "$blue",
        borderBottom: "solid 1px $blue",
      },
      green: {
        color: "$green",
        borderBottom: "solid 1px $green",
      },
      yellow: {
        color: "$yellow",
        borderBottom: "solid 1px $yellow",
      },
      pink: {
        color: "$pink",
        borderBottom: "solid 1px $pink",
      },
    },
  },
  defaultVariants: {
    color: "blue",
  },
});

export const CardRow = styled(Flex, {
  marginLeft: 10,
  marginRight: 10,
  gap: 5,
  alignItems: "center",
});

export type CardProps = {
  title: string;
  subtitle?: string;
  onDelete: () => void;
  color?: "yellow" | "pink" | "green" | "blue";
  titlecolor?: "yellow" | "pink" | "green" | "blue";
  children: any;
};

export const Card = ({
  color,
  title,
  titlecolor,
  subtitle,
  onDelete,
  children,
}: CardProps) => {
  return (
    <CardRoot color={color}>
      <Flex>
        <DelButton onClick={onDelete}>x</DelButton>
        <CardTitle>
          <Flex direction="column">
            <Text align="right" css={{ marginBottom: 5 }} color={titlecolor}>
              {title}
            </Text>
            <Text align="right" size="small" color="blue">
              {subtitle}
            </Text>
          </Flex>
        </CardTitle>
      </Flex>
      {children}
    </CardRoot>
  );
};
