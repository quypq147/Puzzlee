'use client'

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "../../../components/ui/field";

export default function SignInForm() {
  return (
    <div>
      <form>
        <FieldGroup>
          <FieldSet>
            <FieldLabel>
              <h1 className="flex">Đăng Nhập</h1>
            </FieldLabel>
            
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
}
