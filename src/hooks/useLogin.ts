import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export function useLogin() {
    const setUser = useAuthStore((s) => s.setUser);
    const router = useRouter();

    return useMutation({
        mutationFn: async (credentials: { email: string; password: string }) => {
            const { data } = await axios.post("/api/auth/login", credentials);
            return data;
        },
        onSuccess: (data) => {
            setUser(data.user);
            Swal.fire({
                title: "Success",
                text: "Success login",
                icon: "success",
                confirmButtonText: "OK",
            }).then((res)=>{
                router.push(`/patient/dashboard`);
            });

        },
        onError: (xhr: any) => {
            console.log(xhr);
            const err = Object.values(
                xhr.response?.data?.errors ?? { error: [xhr.response?.data?.message ?? "Login failed"] }
            ).toString();
            Swal.fire({
                title: "Error!",
                text: err,
                icon: "error",
                confirmButtonText: "OK",
            });
            console.log(xhr.response?.data);
        }
    });
}
