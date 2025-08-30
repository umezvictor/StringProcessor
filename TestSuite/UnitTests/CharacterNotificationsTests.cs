namespace TestSuite.UnitTests
{
    using Domain.Procesor;
    using Microsoft.AspNetCore.SignalR;
    using Microsoft.Extensions.Logging;
    using Moq;
    using System.Threading;
    using System.Threading.Tasks;
    using Webly.SignalR.CustomClients;
    using Webly.SignalR.Hubs;
    using Webly.SignalR.Services;
    using Xunit;


    public class CharacterNotificationsTests
    {
        private readonly Mock<ILogger<CharacterNotifications>> _mockLogger = new();
        private readonly Mock<IHubContext<NotificationHub, INotificationsClient>> _mockHubContext = new();
        private readonly CharacterNotifications _serviceToTest;

        public CharacterNotificationsTests()
        {

            _serviceToTest = new CharacterNotifications(_mockLogger.Object, _mockHubContext.Object);
        }

        [Fact]
        public async Task SendCharactersToClient_WhenGivenProcessedString_ShouldSendCharactersViaNotifications()
        {


            // Arrange
            var processedString = "Hello World";
            var userId = Guid.NewGuid().ToString();
            var request = new ProcessStringRequest
            {
                Id = Guid.NewGuid().ToString(),
                UserId = userId,
                InputString = "Hello World",
                IsCompleted = false,
                IsCancelled = false
            };

            var cancellationToken = CancellationToken.None;

            _mockHubContext.Setup(x => x.Clients.User(userId).MessageLength(It.IsAny<int>()));
            _mockHubContext.Setup(x => x.Clients.User(userId).ReceiveNotification(It.IsAny<string>()));
            _mockHubContext.Setup(x => x.Clients.User(userId).ProcessingCompleted());

            // Act
            await _serviceToTest.SendCharactersToClient(processedString, userId, request, cancellationToken);

            // Assert
            _mockHubContext.Verify(x => x.Clients.User(userId).MessageLength(It.IsAny<int>()), Times.Once);
            _mockHubContext.Verify(x => x.Clients.User(userId).ReceiveNotification(It.IsAny<string>()), Times.AtLeastOnce());
            _mockHubContext.Verify(x => x.Clients.User(userId).ProcessingCompleted(), Times.Once);

        }

    }
}
