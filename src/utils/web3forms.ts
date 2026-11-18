export const WEB3FORMS_ACCESS_KEY = '995f1f7d-70dd-429b-9baa-60c9eeb80eff';

export interface Web3FormsResponse {
  success: boolean;
  message: string;
}

export async function submitWeb3Form(data: Record<string, string | number | boolean | undefined>): Promise<Web3FormsResponse> {
  try {
    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      ...data,
    };

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    return {
      success: response.ok && result.success,
      message: result.message || (response.ok ? 'Submission successful!' : 'Submission failed.'),
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Network error. Please try again later.',
    };
  }
}
