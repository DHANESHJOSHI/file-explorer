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

  const handleCreate = () => {
    if (fileName.trim().length <= 0) {
      return;
    }
    // edge-case: ".gitignore", ".env" (Handled)
    const isFile = fileName.split(".").length > 1;

    const newItem: Item = {
      id: Math.random().toString(36).substring(2),
      name: fileName,
      isFolder: !isFile,
      items: [],
    };

    // No api calls involved (in this example)
    setLocalItem({
      ...localItem,
      items: [...localItem.items, newItem],
    });

    setFileName("");
    setIsCreating(false);
  };

  return (
    <div className="flex flex-col ml-4 my-2 w-56 truncate flex-shrink-0">
      {localItem.isFolder ? (
        <>
          <button
            className="flex justify-start items-center font-semibold flex-shrink-0"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <FolderOpenIcon className="h-4 w-4 mr-2 flex-shrink-0" />
            ) : (
              <FolderIcon className="h-4 w-4 mr-2 flex-shrink-0" />
            )}
            {localItem.name}
          </button>
          <div
            style={{
              display: open ? "block" : "none",
            }}
          >
            {localItem.items.map((item) => {
              return <ExplorerItem key={localItem.id} item={item} />;
            })}
            {isCreating ? (
              <div className="ml-4">
                <input
                  className="w-32 outline-none border-[1px] border-gray-500 px-2"
                  placeholder="index.js"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      setIsCreating(false);
                    }
                    if (e.key === "Enter") {
                      handleCreate();
                    }
                  }}
                />
              </div>
            ) : (
              <button
                className="ml-4 text-gray-500"
                onClick={() => {
                  setIsCreating(!isCreating);
                }}
              >
                + create
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="flex justify-start items-center flex-shrink-0">
          <DocumentIcon className="h-4 w-4 mr-2 flex-shrink-0" />
          {localItem.name}
        </div>
      )}
    </div>
  );
};

export default ExplorerItem;
