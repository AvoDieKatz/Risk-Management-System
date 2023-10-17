import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../services/TestService";
import {
    AwaitConnectionIndicator,
    LoadingIndicator,
} from "../components";

const TestPage = () => {
    const { isLoading, isError, isPaused, data } = useQuery({
        queryKey: ["fetchTodos"],
        queryFn: async () => {
            console.log("queryFn run");
            await new Promise((resolve) => setTimeout(resolve, 550));
            const response = await getTodos();
            return response.data;
        },
        meta: {
            successMessage: "Data loaded",
        },
    });

    return (
        <>
            {isPaused ? (
                <AwaitConnectionIndicator />
            ) : isLoading ? (
                <LoadingIndicator />
            ) : isError ? (
                <p className="text-bold">Error!</p>
            ) : (
                <>
                    {data.map((el) => (
                        <p key={el.id} className="text-thin">
                            {JSON.stringify(el)}
                        </p>
                    ))}
                </>
            )}
        </>
    );
};

export default TestPage;
