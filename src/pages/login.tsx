import { Button, Form, Input } from 'antd';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';


const Login = () => {
    const router = useRouter();

    const onFinish = async (values: any) => {
        const { email, password } = values;
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password
        });

        if (result?.ok) {
            router.push('/dashboard'); // ou a rota que você deseja redirecionar após o login
        } else {
            alert("Email ou senha incorretos!");
        }
    };

    return (
        <div style={{ maxWidth: 300, margin: '100px auto' }}>
            <Form
                name="login"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Por favor, insira seu e-mail!' }]}
                >
                    <Input placeholder="E-mail" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
                >
                    <Input.Password placeholder="Senha" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        Entrar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
