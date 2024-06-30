import { Button, Form, Input } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';

const Register = () => {
    const router = useRouter();

    const onFinish = async (values: any) => {
        try {
            const { data } = await axios.post('/api/users', {
                name: values.name,
                email: values.email,
                password: values.password
            });
            alert('Registro efetuado com sucesso!');
            router.push('/login'); // Redirecionar para a página de login após o registro
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                alert(error.response.data.message); // Mostrar mensagem de erro vinda do servidor
            } else {
                alert('Erro ao registrar usuário, tente novamente.');
            }
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div style={{ maxWidth: 300, margin: '100px auto' }}>
            <Form
                name="register"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Por favor, insira seu nome!' }]}
                >
                    <Input placeholder="Nome completo" />
                </Form.Item>

                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Por favor, insira seu e-mail!' }]}
                >
                    <Input placeholder="E-mail" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Por favor, crie uma senha!' }]}
                >
                    <Input.Password placeholder="Senha" />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Por favor, confirme sua senha!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('As duas senhas não coincidem!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="Confirmar senha" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        Registrar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Register;
