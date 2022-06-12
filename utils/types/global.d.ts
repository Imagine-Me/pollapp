declare module "authentication/recoil/user" {
    export interface UserProps {
      name: string;
      isLoggedIn: boolean;
      userImage: string;
      email: string;
      isLoading: boolean;
      tokenId: string | null;
    }
  }
  