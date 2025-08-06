import { IconBrandInstagram } from "@tabler/icons-react";
import { ActionIcon, Container, Group } from "@mantine/core";
import classes from "./Footer.module.css";

export function Footer() {
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Group
          gap={0}
          className={classes.links}
          justify="flex-end"
          wrap="nowrap"
        >
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram
              size={150}
              stroke={1.5}
              onClick={() => {
                window.open(
                  "https://www.instagram.com/justbluesocial/",
                  "_blank"
                );
              }}
            />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}
