import { useRouter } from "next/router";
import { useEffect } from "react";

const withRole = (WrappedComponent, role) => {
  const WithRoleComponent = (props) => {
    const router = useRouter();

    useEffect(() => {
      // Get the user's role from session storage
      const userRole = window.sessionStorage.getItem("role");

      // If the user's role doesn't match the required role, redirect them to their dashboard
      if (userRole !== role) {
        router.push(`/${userRole}`);
      }
    }, [router, role]); // Include router and role in the dependency array

    return <WrappedComponent {...props} />;
  };

  // Preserve getLayout property if it exists
  if (WrappedComponent.getLayout) {
    WithRoleComponent.getLayout = WrappedComponent.getLayout;
  }

  return WithRoleComponent;
};

export default withRole;
