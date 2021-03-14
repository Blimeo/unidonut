import { Container, Paper, Typography } from "@material-ui/core";
import React from "react";
import styles from "./css/Home.module.css";


export default function Home() {
    return (
      <Container maxWidth="md" className={styles.homeContainer}>
        <div style={{ textAlign: "center" }}>
          <Typography variant="h2">Unidonut</Typography>
          <Typography variant="body1">
            A platform allowing university students to connect.
          </Typography>
        </div>
      </Container>
    );
}