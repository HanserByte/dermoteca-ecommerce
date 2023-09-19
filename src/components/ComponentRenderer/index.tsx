const ComponentRenderer = ({
  component,
  data,
}: {
  component: string;
  data: any;
}) => {
  const Component = require(`../componentsSanity/${component}`).default;
  return <Component data={data} />;
};

export default ComponentRenderer;
