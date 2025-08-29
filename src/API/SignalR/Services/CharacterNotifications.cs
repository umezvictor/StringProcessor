using Domain.Procesor;
using Microsoft.AspNetCore.SignalR;
using Webly.Jobs;
using Webly.SignalR.Abstractions;
using Webly.SignalR.CustomClients;
using Webly.SignalR.Hubs;

namespace Webly.SignalR.Services
{

    public class CharacterNotifications(ILogger<StringProcessorJob> logger,
        IHubContext<NotificationHub, INotificationsClient> hubContext
        ) : ICharacterNotifications
    {

        public async Task SendCharactersToClient(string processedString, string userId, ProcessStringRequest request,
            CancellationToken cancellationToken)
        {

            await hubContext.Clients.User(userId).MessageLength(processedString.Length);

            foreach (char character in processedString)
            {
                cancellationToken.ThrowIfCancellationRequested();
                await hubContext.Clients.User(userId).ReceiveNotification(character.ToString());
                await Task.Delay(1000, cancellationToken);
            }

            logger.LogInformation("Processing completed");
            await hubContext.Clients.User(userId).ProcessingCompleted();


        }
    }
}
