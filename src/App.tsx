import ExplorerItem from "./components/explorer-item";
import fileExplorer from "./data/file-explore.json";

const App = () => {
  return (
    <>
      <ExplorerItem item={fileExplorer} />
    </>
  );
};

export default App;
