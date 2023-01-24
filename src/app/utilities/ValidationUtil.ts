import { AbstractControl, ValidatorFn } from "@angular/forms";

export class ValidationUtil {

  public static verifyEmail(email: string) {
    //TODO
  }

  public static verifyEmailId(): ValidatorFn {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return (control: AbstractControl): { [key: string]: boolean } | null => {
      // const _EMAIL = control.get('email');
      if (!control.value) {
        return null;
      } else {
        const invalidEmail = re.test(control.value);
        return invalidEmail ? null : { invalidEmail: true };
      }
    };
  }

  public static verifyPassword(password: string) {
    //TODO
  }
}
