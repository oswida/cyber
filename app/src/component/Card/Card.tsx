import { faClose } from "@fortawesome/free-solid-svg-icons";
import { styled } from "~/common";
import { Flex, LTIconButton, Text } from "~/component";

const CardRoot = styled("div", {
  padding: 10,
  position: "relative",
  display: "flex",
  flexDirection: "column",
  borderRadius: "20px 0px",
  outlineOffset: 2,
  marginTop: 3,
  variants: {
    size: {
      standard: {
        minWidth: 190,
        maxWidth: 350,
        width: 330,
        height: 200,
      },
      small: {
        minWidth: 190,
        maxWidth: 250,
        width: 250,
        fontSize: "$0",
      },
    },
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
    size: "standard",
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
  marginBottom: 10,
});

export type CardProps = {
  title: string;
  subtitle?: string;
  onDelete: () => void;
  color?: "yellow" | "pink" | "green" | "blue";
  titlecolor?: "yellow" | "pink" | "green" | "blue";
  height?: number | string;
  children: any;
  id?: string;
  size?: "standard" | "small";
};

export const Card = ({
  color,
  title,
  titlecolor,
  subtitle,
  onDelete,
  height,
  children,
  id,
  size,
}: CardProps) => {
  return (
    <CardRoot color={color} css={{ height: height }} id={id} size={size}>
      <Flex>
        <LTIconButton icon={faClose} onClick={onDelete} hoverColor="red" />
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
