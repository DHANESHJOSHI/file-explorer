import { useState } from "react";
import {
  FolderIcon,
  FolderOpenIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";

interface Item {
  id: string;
  name: string;
  isFolder: boolean;
  items: Item[];
}

const ExplorerItem = ({ item }: { item: Item }) => {
  const [open, setOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [fileName, setFileName] = useState("");
  const [localItem, setLocalItem] = useState(item);

  const toggleOpen = () => setOpen(!open);

  const handleCreate = () => {
    if (fileName.trim().length <= 0) return;

    // edge-case: ".gitignore", ".env" (Handled)
    const isFile = fileName.split(".").length > 1;

    const newItem: Item = {
      id: Math.random().toString(36).substring(2),
      name: fileName,
      isFolder: !isFile,
      items: [],
    };
    // sort items alphabetically
    const updatedItems = [...localItem.items, newItem].sort((a, b) => {
      if (a.isFolder && !b.isFolder) return -1;
      if (!a.isFolder && b.isFolder) return 1;
      return a.name.localeCompare(b.name);
    });


    // No api calls involved (in this example)
    setLocalItem({
      ...localItem,
      items: [...localItem.items, newItem],
    });

    setFileName("");
    setIsCreating(false);
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setIsCreating(false);
    }
    if (e.key === "Enter") {
      handleCreate();
    }
  };

  return (
    <div className="flex flex-col flex-shrink-0 w-56 my-2 ml-4 truncate">
      {localItem.isFolder ? (
        <>
          <button
            className="flex items-center justify-start flex-shrink-0 font-semibold"
            onClick={toggleOpen}
          >
            {open ? (
              <FolderOpenIcon className="flex-shrink-0 w-4 h-4 mr-2" />
            ) : (
              <FolderIcon className="flex-shrink-0 w-4 h-4 mr-2" />
            )}
            {localItem.name}
          </button>
          <div style={{ display: open ? "block" : "none" }}>
            {localItem.items
              .sort((a, b) => {
                if (a.isFolder && !b.isFolder) return -1; // Folder should always come before files
                if (!a.isFolder && b.isFolder) return 1; // Files should come after folders
                return a.name.localeCompare(b.name);
              })
              .map((item, index) => (
                <ExplorerItem key={`${item.id}-${index}`} item={item} />
              ))}
            {isCreating ? (
              <div className="ml-4">
                <input
                  className="w-32 outline-none border-[1px] border-gray-500 px-2"
                  placeholder="index.js"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  autoFocus
                  onKeyDown={handleKeyPress}
                />
              </div>
            ) : (
              <button
                className="ml-4 text-gray-500"
                onClick={() => setIsCreating(true)}
              >
                + create
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-start flex-shrink-0">
          <DocumentIcon className="flex-shrink-0 w-4 h-4 mr-2" />
          {localItem.name}
        </div>
      )}
    </div>
  );
};

export default ExplorerItem;
