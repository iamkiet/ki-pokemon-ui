import React, { useContext, useEffect, useState } from "react";

import { Row, Col, Divider, Layout, Image, Button } from "antd";
import PokeCard from "./PokeCard";
import Header from "./Header";
import env from "../env";
import axios from "axios";
import { PokemonContext } from "../contexts/PokemonContextProvider";
import PokeForm from "./PokeForm";

function Home(props) {
  const { state, dispatch } = useContext(PokemonContext);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(env.API_CANDIDATES).then((res) => {
      setLoading(true);
      dispatch({ type: env.ACTION_UPDATE_CANDIDATES, value: res.data });
    });
  });

  const { pokemons, defaultImagePath } = state;
  const PokeCols = pokemons.map((poke, index) => {
    return (
      <Col key={index} align="center" span={6}>
        <PokeCard poke={poke} />
      </Col>
    );
  });
  const PokesDOM = loading ? (
    PokeCols
  ) : (
    <Button type="primary" loading>
      Loading Pokemons . . .
    </Button>
  );

  return (
    <Layout style={{ backgroundColor: "#383A59" }} className="layout">
      <Header />
      <Row justify="space-around" type="flex" align="middle">
        <Col align="center" span={6}>
          <PokeForm></PokeForm>
        </Col>
        <Col
          align="center"
          span={6}
          style={{ height: "700px", resize: "none", alignItems: "center" }}
        >
          <Image
            style={{ lineHeight: "700px" }}
            src={process.env.PUBLIC_URL + defaultImagePath}
          />
        </Col>
      </Row>

      <Divider
        style={{ backgroundColor: "#9581FF", color: "white" }}
        orientation="right"
      >
        p o k e m o n
      </Divider>

      <Row justify="space-around" type="flex" align="middle">
        {PokesDOM}
      </Row>
      <Divider
        style={{ backgroundColor: "#9581FF", color: "white" }}
        orientation="center"
      >
        p o k e m o n
      </Divider>
    </Layout>
  );
}

export default Home;
