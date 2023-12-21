import React, { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";
import { fxLoadReceipts } from "./model";
import { useDebounce } from "../../hooks/useDebounce";
import { fxGetFavorites } from "../../state/favorites";
import _ from "lodash";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { AllReceipts } from "./AllRecipes";
import { FavoriteReceipts } from "./FavoritesRecipes";
import { OwnReceipts } from "./OwnReceipts";
import { useLocalSearchParams } from "expo-router";

const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: "black" }}
    style={{ backgroundColor: "white", marginBottom: 10 }}
    inactiveColor="gray"
    activeColor="black"
  />
);

const renderScene = SceneMap({
  all: AllReceipts,
  favorites: FavoriteReceipts,
  own: OwnReceipts,
});

export default function ReceiptsScreen() {
  const { activeTab } = useLocalSearchParams<{ activeTab: string }>();
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(activeTab ? +activeTab : 2);
  const [routes] = useState([
    { key: "all", title: "Всі" },
    { key: "favorites", title: "Улюблені" },
    { key: "own", title: "Власні" },
  ]);

  return (
    <TabView
      style={{ backgroundColor: "#fff" }}
      navigationState={{ index, routes }}
      renderTabBar={renderTabBar}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}
