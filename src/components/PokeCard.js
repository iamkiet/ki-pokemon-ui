import React, { useContext } from "react";
import axios from "axios";
import env from "../env";
import { Card, Image, Avatar } from "antd";
import {
  HeartFilled,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { PokemonContext } from "../contexts/PokemonContextProvider";
const { Meta } = Card;

function PokeCard(props) {
  const { dispatch } = useContext(PokemonContext);
  const { poke } = props;
  const { id, name, image_path, vote_counting } = poke;

  const onRemovePoke = () => {
    axios
      .delete(env.API_CANDIDATES + "/" + id)
      .then((res) => {
        let { status } = res;
        if (status === 200) {
          axios.get(env.API_CANDIDATES).then((res) => {
            dispatch({ type: env.ACTION_UPDATE_CANDIDATES, value: res.data });
          });
        }
      })
      .catch((error) => {
        alert(error + "huhu");
      });
  };

  const onPokeVoted = () => {
    const payload = {
      vote_counting: vote_counting + 1 
    }
    axios
      .put(env.API_CANDIDATES + "/" + id, payload)
      .then((res) => {
        let { status } = res;
        if (status === 200) {
          axios.get(env.API_CANDIDATES).then((res) => {
            dispatch({ type: env.ACTION_UPDATE_CANDIDATES, value: res.data });
          });
        }
      })
      .catch((error) => {
        alert(error + "huhu");
      });
  };

  return (
    <Card
      style={{
        backgroundColor: "transparent",
        borderRadius: "5px",
        width: 300,
        marginTop: 16,
      }}
      actions={[
        <DeleteOutlined onClick={onRemovePoke} key="setting" />,
        <EditOutlined key="edit" />,
        <HeartFilled onClick={onPokeVoted} key="ellipsis" />,
      ]}
    >
      <Meta
        avatar={
          <Avatar
            size={150}
            src={<Image src={process.env.PUBLIC_URL + image_path} />}
          />
        }
        title={name}
        description={"voted: " + vote_counting}
      />
    </Card>
  );
}

export default PokeCard;
