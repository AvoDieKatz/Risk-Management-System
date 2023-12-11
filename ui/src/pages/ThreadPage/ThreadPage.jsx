import React, { useState } from "react";
import {
    AwaitConnectionIndicator,
    DataDisplay,
    ErrorIndicator,
    LoadingIndicator,
    Panel,
} from "../../components";
import { useQuery } from "@tanstack/react-query";
import threadService from "../../services/ThreadService";
import { createColumnHelper } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";

const MainPanel = ({ ...props }) => {
    const [viewStyle, setViewStyle] = useState("list");

    const handleViewStyleChange = (e, style) => {
        if (style !== null) {
            setViewStyle(style);
        }
    };

    return (
        <Panel>
            <DataDisplay
                {...props}
                viewStyle={viewStyle}
                onViewStyleChange={handleViewStyleChange}
            />
        </Panel>
    );
};

const ThreadPage = () => {
    const navigate = useNavigate();
    const handleItemClick = (event, item) => {
        navigate(`/thread/${item.id}`);
    };

    const {
        isLoading,
        isError,
        isPaused,
        data: fetchedData,
    } = useQuery({
        queryKey: ["threads"],
        queryFn: async () => {
            await new Promise((resolve) => setTimeout(resolve, 550));
            const response = await threadService.getThreads("ACTIVE");
            return response.data;
        },
        meta: {
            errorMessage: "There is an error while loading threads data.",
        },
    });

    const tableColumnHelper = createColumnHelper();

    const columns = [
        tableColumnHelper.accessor("id", {
            header: () => "ID",
            cell: (info) => info.getValue(),
        }),
        tableColumnHelper.accessor("title", {
            header: () => <span>Title</span>,
            cell: (info) => info.getValue(),
        }),
        tableColumnHelper.accessor("status", {
            header: () => <span>Status</span>,
            cell: (info) => info.getValue(),
        }),
        tableColumnHelper.accessor("category.name", {
            header: () => <span>Category</span>,
            cell: (info) => info.getValue(),
        }),
        tableColumnHelper.accessor("author.fullName", {
            header: () => "Author",
            cell: (info) => info.renderValue(),
        }),
        tableColumnHelper.accessor("riskOwner.fullName", {
            header: () => <span>Risk Owner</span>,
        }),
        // tableColumnHelper.display({
        //     id: "action",
        //     cell: ({ row }) => (
        //         <Button component={Link} to={`/${row.original.id}`}>
        //             Detail
        //         </Button>
        //     ),
        // }),
    ];

    return isPaused ? (
        <AwaitConnectionIndicator />
    ) : isLoading ? (
        <LoadingIndicator />
    ) : isError ? (
        <ErrorIndicator />
    ) : (
        <MainPanel
            data={fetchedData}
            columns={columns}
            handleItemClick={handleItemClick}
        />
    );
};

export default ThreadPage;
