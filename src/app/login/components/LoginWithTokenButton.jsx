import { Button } from "primereact/button"

const LoginWithTokenButton = () => {
  return (
    <Button
        outlined
        className="rounded py-2 px-4"
        severity="secondary"
        label="Login with token"
        icon="pi pi-arrow-right"
        iconPos="right"
    />
  )
}

export default LoginWithTokenButton