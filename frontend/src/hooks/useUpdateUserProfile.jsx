import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useUpdateUserProfile = ({ profileImg, coverImg, setCoverImg ,setProfileImg  } = {}) => {
	const queryClient = useQueryClient();

    
 
    const { mutate: updateProfile, isPending: isUpdatingProfile } = useMutation({
        mutationFn: async (formData) => {
            try {
                const res = await fetch("/api/users/update", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong");
                }
                const data = await res.json();
                return data;

            } catch (error) {
                throw new Error(error);
            }
        },
        onSuccess: () => {
            toast.success("Profile updated successfully");

            if (profileImg || coverImg) {
            setProfileImg(null);
            setCoverImg(null);
            }
            
            Promise.all([
                queryClient.invalidateQueries({ queryKey: ["authUser"] }),
                queryClient.invalidateQueries({ queryKey: ["userProfile"] }),
            ]);
          
        },
        onError: (error) => {
            toast.error(error.message);
        },
    }
    )

    return {updateProfile,isUpdatingProfile};
};

export default useUpdateUserProfile;